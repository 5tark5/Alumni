import { useState } from 'react';

// --- SVG Icon Components ---
const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);
const UsersIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);
const MessageSquareIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
);
const SettingsIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);
const BellIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
);
const SearchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);
const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m6 9 6 6 6-6" /></svg>
);
const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);


// --- Main Dashboard Component ---
export default function InstituteDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen flex font-sans">
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/80 backdrop-blur-sm p-6 flex-shrink-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:bg-slate-800/50`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              </div>
              <span className="text-xl font-bold text-white">Alum.io</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 text-white bg-blue-500/20 rounded-lg py-2 px-3">
            <HomeIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-slate-700/50 rounded-lg py-2 px-3 transition-colors">
            <UsersIcon className="w-5 h-5" />
            <span>Alumni Directory</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-slate-700/50 rounded-lg py-2 px-3 transition-colors">
            <CalendarIcon className="w-5 h-5" />
            <span>Events</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-slate-700/50 rounded-lg py-2 px-3 transition-colors">
            <MessageSquareIcon className="w-5 h-5" />
            <span>Messages</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-slate-700/50 rounded-lg py-2 px-3 transition-colors">
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mr-4 p-1 text-slate-300">
                <MenuIcon className="w-6 h-6" />
              </button>
              <div>
                  <h1 className="text-xl md:text-3xl font-bold text-white">Institute Dashboard</h1>
                  <p className="text-slate-400 hidden md:block">Welcome back, Redwood University!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative hidden md:block">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      aria-label="Search"
                      className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 w-48 lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button className="p-2 hover:bg-slate-700/50 rounded-full">
                    <BellIcon />
                </button>
                <div className="flex items-center space-x-2">
                    <img src="https://placehold.co/40x40/6366f1/ffffff?text=R" alt="User Avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                    <div className="hidden sm:block">
                      <span className="text-white font-semibold">Redwood Uni</span>
                      <ChevronDownIcon className="w-5 h-5 inline text-slate-400"/>
                    </div>
                </div>
            </div>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-slate-400">Total Alumni</h3>
                <p className="text-3xl font-bold text-white">50,284</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-slate-400">Engagement Rate</h3>
                <p className="text-3xl font-bold text-green-400">68%</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-slate-400">Upcoming Events</h3>
                <p className="text-3xl font-bold text-white">12</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-slate-400">New Members</h3>
                <p className="text-3xl font-bold text-blue-400">+125 this month</p>
            </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Alumni Growth Chart */}
            <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Alumni Growth</h3>
                <div className="h-80 bg-slate-700/30 rounded-lg flex items-center justify-center">
                    <p className="text-slate-500">[Chart Placeholder]</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <img src="https://placehold.co/40x40/ec4899/ffffff?text=JD" alt="User" className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="text-white">Jane Doe updated her profile.</p>
                            <p className="text-sm text-slate-400">2 hours ago</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-3">
                        <img src="https://placehold.co/40x40/f59e0b/ffffff?text=MS" alt="User" className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="text-white">Mike Smith registered for Annual Gala.</p>
                            <p className="text-sm text-slate-400">5 hours ago</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center"><CalendarIcon className="text-green-400 w-5 h-5"/></div>
                        <div>
                            <p className="text-white">New Event: Homecoming 2025</p>
                            <p className="text-sm text-slate-400">1 day ago</p>
                        </div>
                    </div>
                     <div className="flex items-center space-x-3">
                        <img src="https://placehold.co/40x40/8b5cf6/ffffff?text=AS" alt="User" className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="text-white">Anna Scott joined the platform.</p>
                            <p className="text-sm text-slate-400">2 days ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

