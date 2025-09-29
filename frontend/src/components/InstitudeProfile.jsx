import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileQuery, useUpdateProfileMutation } from '../redux/api/instituteApiSlice.js';
import { setCredentials } from '../redux/features/auth/authSlice.js';
import { toast } from 'react-toastify';
import countryList from 'react-select-country-list';

const Loader = () => ( <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div> );

export default function InstituteProfile() {
  const [name, setName] = useState('');
  const [instituteEmail, setEmail] = useState('');
  const [institutePhone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState(''); // ✅ State for country
  const [zipCode, setZipCode] = useState('');
  const [institutePassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch = useDispatch();
  const { instituteInfo } = useSelector((state) => state.auth);

  const { data: institute, isLoading, error, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  
  const countryOptions = countryList().getData();

  useEffect(() => {
    if (institute) {
      setName(institute.name);
      setEmail(institute.instituteEmail);
      setPhone(institute.institutePhone);
      setProfileImage(institute.profileImage);
      setAddress(institute.address || '');
      setCity(institute.city || '');
      setState(institute.state || '');
      setCountry(institute.country || ''); // ✅ Populate country
      setZipCode(institute.zipCode || '');
    }
  }, [institute]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file.');
        return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pictures'); 
    try {
      toast.info('Uploading image...');
      const res = await fetch(`https://api.cloudinary.com/v1_1/dnqmcgu0l/image/upload`, { e,
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setProfileImage(data.secure_url);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      toast.error(err.message || 'Image upload failed.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (institutePassword && institutePassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const updatedData = {
        _id: instituteInfo._id,
        name,
        instituteEmail,
        institutePhone,
        profileImage,
        address,
        city,
        state,
        country, // ✅ Add country to payload
        zipCode,
      };
      if (institutePassword) {
        updatedData.institutePassword = institutePassword;
      }
      const res = await updateProfile(updatedData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully!');
      refetch();
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return ( <div className="flex justify-center items-center h-screen bg-slate-900"><Loader /></div> );
  if (error) return ( <div className="flex justify-center items-center h-screen bg-slate-900 text-red-500">Error: {error?.data?.message || error.error}</div> );

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Institute Profile</h1>
        <div className="bg-slate-800/50 p-6 sm:p-8 rounded-lg">
          <form onSubmit={submitHandler} className="space-y-6">
            
            <div className="flex items-center space-x-6">
                <img src={profileImage || 'https://i.ibb.co/4pDNDk1/avatar.png'} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-slate-700" />
                <div>
                    <label htmlFor="image-upload" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">Change Image</label>
                    <input type="file" id="image-upload" accept="image/*" onChange={uploadFileHandler} className="hidden" />
                    <p className="text-xs text-slate-400 mt-2">JPG, PNG, GIF up to 5MB</p>
                </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Institute Name</label>
              <input id="name" type="text" autoComplete="organization" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your University Name" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input id="email" type="email" autoComplete="email" required value={instituteEmail} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Institute Phone Number</label>
              <input id="phone" type="tel" autoComplete="tel" required value={institutePhone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <h2 className="text-lg font-semibold text-white pt-4 border-t border-slate-700">Location Details</h2>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-2">Address</label>
              <input id="address" type="text" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Alumni Ave" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">Country</label>
                <select id="country" autoComplete="country-name" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Country</option>
                  {countryOptions.map(option => (
                    <option key={option.value} value={option.label}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2">City</label>
                <input id="city" type="text" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Metropolis" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-slate-300 mb-2">State / Province</label>
                <input id="state" type="text" autoComplete="address-level1" value={state} onChange={(e) => setState(e.target.value)} placeholder="California" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-slate-300 mb-2">Zip / Postal Code</label>
                <input id="zipCode" type="text" autoComplete="postal-code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="10001" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            
            <h2 className="text-lg font-semibold text-white pt-4 border-t border-slate-700">Update Password</h2>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
              <input id="password" type="password" value={institutePassword} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current password" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit" disabled={isUpdating} className="w-full py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed">
              {isUpdating ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}