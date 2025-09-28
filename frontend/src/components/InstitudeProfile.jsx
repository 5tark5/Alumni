import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileQuery, useUpdateProfileMutation } from '../redux/api/instituteApiSlice.js';
import { setCredentials } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';

// A simple loading spinner component
const Loader = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
);

// --- Main Profile Component ---
export default function InstituteProfile() {
  // Local state for form fields
  const [name, setName] = useState('');
  const [instituteEmail, setEmail] = useState('');
  const [institutePhone, setPhone] = useState('');
  const [institutePassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  
  // Get institute info from global Redux state
  const { instituteInfo } = useSelector((state) => state.auth);

  // RTK Query hooks
  const { data: institute, isLoading, error, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Populate form with data when it loads
  useEffect(() => {
    if (institute) {
      setName(institute.name);
      setEmail(institute.instituteEmail);
      setPhone(institute.institutePhone);
    }
  }, [institute]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (institutePassword && institutePassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const updatedData = {
        _id: instituteInfo._id, // Send the ID for identification
        name,
        instituteEmail,
        institutePhone,
      };
      // Only include the password if it's being changed
      if (institutePassword) {
        updatedData.institutePassword = institutePassword;
      }
      
      const res = await updateProfile(updatedData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully!');
      refetch(); // Refetch profile data to ensure UI is up-to-date
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-900 text-red-500">
        Error: {error?.data?.message || error.error}
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Institute Profile</h1>

        <div className="bg-slate-800/50 p-6 sm:p-8 rounded-lg">
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Institute Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your University Name"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={instituteEmail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                Institute Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={institutePhone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <h2 className="text-lg font-semibold text-white pt-4 border-t border-slate-700">Update Password</h2>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={institutePassword}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}