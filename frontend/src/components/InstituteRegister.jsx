import { useState, useRef, useEffect } from "react";

// --- SVG Icon Components ---
const LayoutDashboardIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

const UsersIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const BookOpenIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// --- Particle Background ---
const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
        ctx.fillStyle = "rgba(71, 85, 105, 0.5)";
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
        let size = Math.random() * 2 + 1;
        let x =
          Math.random() * (canvas.width - size * 4) + size * 2;
        let y =
          Math.random() * (canvas.height - size * 4) + size * 2;
        let directionX = Math.random() * 0.4 - 0.2;
        let directionY = Math.random() * 0.4 - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = dx * dx + dy * dy;

          if (distance < (canvas.width / 8) * (canvas.height / 8)) {
            ctx.strokeStyle = `rgba(100, 116, 139, ${
              1 - distance / 20000
            })`;
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
      particlesArray.forEach((p) => p.update());
      connect();
    }

    const handleResize = () => {
      setCanvasSize();
      init();
    };

    window.addEventListener("resize", handleResize);
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

// --- Logo ---
const AlumioLogo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    </div>
    <span className="text-3xl font-bold text-white tracking-wider">
      Alum.io
    </span>
  </div>
);

// --- Main Component ---
export default function InstituteRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register:", {
      institutionName,
      email,
      password,
      confirmPassword,
    });
  };

  const features = [
    {
      icon: <LayoutDashboardIcon className="text-blue-400" />,
      title: "Dashboard",
      description: "Track alumni activities & engagement.",
    },
    {
      icon: <UsersIcon className="text-green-400" />,
      title: "Directory",
      description: "Find and connect with alumni profiles.",
    },
    {
      icon: <CalendarIcon className="text-purple-400" />,
      title: "Events",
      description: "Organize and promote meetups.",
    },
    {
      icon: <BookOpenIcon className="text-yellow-400" />,
      title: "Resources",
      description: "Share guides and career tools.",
    },
  ];

  return (
    <div className="bg-slate-900 font-sans text-gray-200 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <InteractiveBackground />
      <div className="w-full max-w-6xl mx-auto z-10">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
          {/* Left */}
          <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="mb-10">
                <AlumioLogo />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight transition-all duration-500">
                The Modern Way to Connect Your Community.
              </h2>
              <p className="text-indigo-200 mb-10">
                Empower your institution with a powerful alumni management
                platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-slate-900/50 border border-slate-700 hover:border-slate-500 transition-all duration-300 p-4 flex items-start space-x-4"
                  >
                    <div className="bg-slate-800 rounded-lg p-2">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 flex items-center justify-between">
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

          {/* Right */}
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
                  <label
                    htmlFor="institutionName"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Institution Name
                  </label>
                  <input
                    id="institutionName"
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="Your University Name"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email-register"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Email address
                  </label>
                  <input
                    id="email-register"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password-register"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password-register"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition transform hover:scale-105"
                >
                  Create Account
                </button>
              </form>
              <p className="mt-8 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-500 hover:text-blue-400"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
