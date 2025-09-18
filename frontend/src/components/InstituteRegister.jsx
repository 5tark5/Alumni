import  { useState, useRef, useEffect } from 'react';

// --- SVG Icon Components (for a cleaner look than emojis) ---
const LayoutDashboardIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const UsersIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// --- Interactive Particle Background ---
const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        let particlesArray = [];
        const numberOfParticles = 80;

        class Particle {
            constructor(x, y, directionX, directionY, size) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(71, 85, 105, 0.5)'; // slate-500 with opacity
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 0.4) - 0.2;
                let directionY = (Math.random() * 0.4) - 0.2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                                 ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                    if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(100, 116, 139, ${opacityValue})`; // slate-400
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }
        
        const handleResize = () => {
            setCanvasSize();
            init();
        }

        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>;
}

// --- Card Spotlight Component for Hover Effect ---
// eslint-disable-next-line react/prop-types
const CardSpotlight = ({ children, className, style }) => {
    const divRef = useRef(null);
    const onMouseMove = (e) => {
        if (!divRef.current) return;
        const { left, top } = divRef.current.getBoundingClientRect();
        divRef.current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
        divRef.current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
    };
    return (
        <div ref={divRef} onMouseMove={onMouseMove} className={className} style={style}>
            {children}
        </div>
    );
};

// --- Alum.io Logo Component ---
const AlumioLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    </div>
    <span className="text-3xl font-bold text-white tracking-wider">Alum.io</span>
  </div>
);

// --- Main App Component ---
/**
 * Alum.io Institute Registration Page
 * This component renders a full-screen, animated registration page for institutions.
 * @component
 * @example
 * return <InstituteRegister />
 * // --- Potential Future Props ---
 * @prop {function} onRegister - Callback function to execute when the user submits the registration form.
 * Receives an object with institutionName, email, and password.
 * @prop {function} onLoginClick - Callback function when the "Sign In" link is clicked.
 * @prop {boolean} isLoading - If true, disables form fields and buttons and shows a loading indicator.
 * @prop {string} error - A string containing an error message to display on the form (e.g., "Email already exists").
 */
export default function InstituteRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Attempting registration with:", { institutionName, email, password, confirmPassword });
  };

  const features = [
    { icon: <LayoutDashboardIcon className="text-blue-400" />, title: "Dashboard", description: "Track alumni activities & engagement.", color: "blue" },
    { icon: <UsersIcon className="text-green-400" />, title: "Directory", description: "Find and connect with alumni profiles.", color: "green" },
    { icon: <CalendarIcon className="text-purple-400" />, title: "Events", description: "Organize and promote meetups.", color: "purple" },
    { icon: <BookOpenIcon className="text-yellow-400" />, title: "Resources", description: "Share guides and career tools.", color: "yellow" },
  ];

  return (
    <>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        .form-input:focus {
            box-shadow: 0 0 0 2px #3b82f6; /* blue-500 */
        }
        .spotlight-card {
            position: relative;
            overflow: hidden;
        }
        .spotlight-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(148, 163, 184, 0.1), transparent 40%);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 0;
        }
        .spotlight-card:hover::before {
            opacity: 1;
        }
        .spotlight-card > * {
            z-index: 1;
            position: relative;
        }
        .btn-shine {
            position: relative;
            overflow: hidden;
        }
        .btn-shine::after {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s ease;
        }
        .btn-shine:hover::after {
            left: 100%;
        }
      `}</style>

      <div className="bg-slate-900 font-sans text-gray-200 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <InteractiveBackground />
        <div className="w-full max-w-6xl mx-auto z-10">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
            
            {/* Left Showcase Column */}
            <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-between relative">
                 <div className="relative z-10">
                     <div className="mb-10">
                         <AlumioLogo />
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                         The Modern Way to Connect Your Community.
                     </h2>
                     <p className="text-indigo-200 mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                         Empower your institution with a powerful, intuitive alumni management platform.
                     </p>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {features.map((feature, index) => (
                             <CardSpotlight 
                                 key={index} 
                                 className="spotlight-card rounded-xl bg-slate-900/50 border border-slate-700 transition-all duration-300 animate-fade-in-up hover:border-slate-500" 
                                 style={{animationDelay: `${0.6 + index * 0.1}s`}}
                             >
                                 <div className="flex items-start space-x-4 p-4">
                                     <div className={`bg-slate-800 rounded-lg p-2`}>{feature.icon}</div>
                                     <div>
                                         <h3 className="font-semibold text-white">{feature.title}</h3>
                                         <p className="text-sm text-slate-400">{feature.description}</p>
                                     </div>
                                 </div>
                             </CardSpotlight>
                         ))}
                     </div>
                 </div>
                  <div className="relative z-10 mt-12 flex items-center justify-between animate-fade-in-up" style={{animationDelay: '1s'}}>
                     <div className="text-center">
                         <p className="text-3xl font-bold text-white">50k+</p>
                         <p className="text-indigo-200 text-sm">Active Alumni</p>
                     </div>
                     <div className="text-center">
                         <p className="text-3xl font-bold text-white">1.2k+</p>
                         <p className="text-indigo-200 text-sm">Events Hosted</p>
                     </div>
                     <div className="text-center">
                         <p className="text-3xl font-bold text-white">300+</p>
                         <p className="text-indigo-200 text-sm">Institutions</p>
                     </div>
                 </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-slate-700"></div>

            {/* Right Form Column */}
            <div className="w-full lg:w-1/2 p-8 md:p-10 flex items-center justify-center">
                <div className="w-full max-w-sm">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Create an Account
                  </h2>
                  <p className="text-slate-400 mb-8">
                    Join the Alum.io network today.
                  </p>
                  <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                      <label htmlFor="institutionName" className="block text-sm font-medium text-slate-300 mb-2">
                        Institution Name
                      </label>
                      <input id="institutionName" name="institutionName" type="text" required value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} placeholder="Your University Name" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 form-input" />
                    </div>
                     <div>
                      <label htmlFor="email-register" className="block text-sm font-medium text-slate-300 mb-2">
                        Email address
                      </label>
                      <input id="email-register" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 form-input" />
                    </div>
                    <div>
                      <label htmlFor="password-register" className="block text-sm font-medium text-slate-300 mb-2">
                        Password
                      </label>
                      <input id="password-register" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 form-input" />
                    </div>
                     <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-300 mb-2">
                        Confirm Password
                      </label>
                      <input id="confirm-password" name="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 form-input" />
                    </div>
                    <div>
                      <button type="submit" className="w-full py-3 px-4 rounded-lg shadow-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 btn-shine">
                        Create Account
                      </button>
                    </div>
                  </form>
                  <p className="mt-8 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                      Sign In
                    </a>
                  </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
