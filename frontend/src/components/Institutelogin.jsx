import  { useState, useRef, useEffect } from "react";

/* ---------------- Icons ---------------- */
const LayoutDashboardIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" width="24" height="24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const UsersIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" width="24" height="24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" width="24" height="24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const BookOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" width="24" height="24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const GoogleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.76,4.73 16.04,5.7 17.06,6.58L19.34,4.49C17.22,2.61 14.81,1.5 12.19,1.5C6.92,1.5 2.71,6.28 2.71,12C2.71,17.72 6.92,22.5 12.19,22.5C17.6,22.5 21.5,18.33 21.5,12.28C21.5,11.77 21.45,11.44 21.35,11.1Z" />
  </svg>
);

/* ---------------- Background Animation ---------------- */
const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(71,85,105,0.5)";
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.dx *= -1;
        if (this.y > canvas.height || this.y < 0) this.dy *= -1;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    let particles = Array.from({ length: 80 }, () => {
      const size = Math.random() * 2 + 1;
      return new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() * 0.4) - 0.2,
        (Math.random() * 0.4) - 0.2,
        size
      );
    });

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dist = (particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2;
          if (dist < (canvas.width / 8) * (canvas.height / 8)) {
            const opacity = 1 - dist / 20000;
            ctx.strokeStyle = `rgba(100,116,139,${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connect();
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

/* ---------------- Card Hover Spotlight ---------------- */
// eslint-disable-next-line react/prop-types
const CardSpotlight = ({ children, className }) => {
  const ref = useRef(null);
  const handleMove = (e) => {
    const { left, top } = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mouse-x", `${e.clientX - left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - top}px`);
  };
  return (
    <div ref={ref} onMouseMove={handleMove} className={className}>
      {children}
    </div>
  );
};

/* ---------------- Logo ---------------- */
const AlumioLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    </div>
    <span className="text-3xl font-bold text-white tracking-wider">Alum.io</span>
  </div>
);

/* ---------------- Main App ---------------- */
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const features = [
    { icon: <LayoutDashboardIcon className="text-blue-400" />, title: "Dashboard", description: "Track alumni activities & engagement." },
    { icon: <UsersIcon className="text-green-400" />, title: "Directory", description: "Find and connect with alumni." },
    { icon: <CalendarIcon className="text-purple-400" />, title: "Events", description: "Promote and manage meetups." },
    { icon: <BookOpenIcon className="text-yellow-400" />, title: "Resources", description: "Share guides and tools." },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4 relative overflow-hidden text-gray-200 font-sans">
      <InteractiveBackground />
      <div className="w-full max-w-6xl mx-auto z-10">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Section */}
          <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <AlumioLogo />
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-10 mb-4">
                The Modern Way to Connect Your Community
              </h2>
              <p className="text-indigo-200 mb-10">
                Empower your institution with a simple but powerful alumni management platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((f, i) => (
                  <CardSpotlight key={i} className="spotlight-card rounded-xl bg-slate-900/50 border border-slate-700 hover:border-slate-500 transition-all">
                    <div className="flex items-start space-x-4 p-4">
                      <div className="bg-slate-800 rounded-lg p-2">{f.icon}</div>
                      <div>
                        <h3 className="font-semibold text-white">{f.title}</h3>
                        <p className="text-sm text-slate-400">{f.description}</p>
                      </div>
                    </div>
                  </CardSpotlight>
                ))}
              </div>
            </div>
            <div className="mt-12 flex justify-between">
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

          {/* Right Section */}
          <div className="w-full lg:w-1/2 p-8 md:p-10 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Institute Sign In</h2>
              <p className="text-slate-400 mb-8">Access your dashboard</p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-slate-300">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm mb-2 text-slate-300">Password</label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" className="w-full py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all">
                  Sign in
                </button>
              </form>

              <div className="my-8 flex items-center">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="mx-4 text-sm text-slate-500">or</span>
                <div className="flex-grow border-t border-slate-700"></div>
              </div>

              <button className="w-full py-3 px-4 flex items-center justify-center space-x-2 rounded-lg border border-slate-700 bg-slate-800 hover:border-indigo-600 transition-all">
                <GoogleIcon className="text-white" />
                <span className="font-medium text-sm">Continue with Google</span>
              </button>

              <p className="mt-8 text-center text-sm text-slate-400">
                Don’t have an account?{" "}
                <a href="#" className="font-medium text-blue-500 hover:text-blue-400">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
