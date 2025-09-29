import { useSelector } from 'react-redux';

export default function DashboardHome() {
  const { instituteInfo } = useSelector((state) => state.auth);
  
  return (
    <div className="bg-slate-800/50 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white">Welcome back, {instituteInfo?.name || 'Institute'}!</h2>
      <p className="text-slate-400 mt-2">This is your main dashboard. Select an option from the sidebar to get started.</p>
    </div>
  );
}