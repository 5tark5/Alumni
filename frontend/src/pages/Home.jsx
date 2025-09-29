import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  School,
  Users,
  GraduationCap,
  Briefcase,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";

// --- Reusable Components ---
const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-slate-300 hover:text-white transition-colors duration-300 relative group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
  </a>
);

// --- Main Home Component ---
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featureData = {
    institute: [
      {
        title: "Centralized Database",
        description:
          "Manage all alumni data in one secure, easy-to-access location.",
      },
      {
        title: "Engagement Analytics",
        description:
          "Track alumni engagement, event attendance, and fundraising campaigns.",
      },
      {
        title: "Event Management",
        description:
          "Organize reunions, webinars, and networking events seamlessly.",
      },
      {
        title: "Communication Hub",
        description:
          "Send targeted newsletters, updates, and announcements with ease.",
      },
    ],
    alumni: [
      {
        title: "Reconnect & Network",
        description:
          "Find and connect with classmates and professionals in your field.",
      },
      {
        title: "Career Opportunities",
        description:
          "Access an exclusive job board and career development resources.",
      },
      {
        title: "Mentor & Give Back",
        description:
          "Offer mentorship to current students and contribute to your alma mater.",
      },
      {
        title: "Stay Updated",
        description:
          "Receive news and updates about your institution and fellow alumni.",
      },
    ],
    student: [
      {
        title: "Alumni Mentorship",
        description:
          "Connect with experienced alumni for career guidance and support.",
      },
      {
        title: "Internship Portal",
        description:
          "Discover exclusive internship opportunities posted by alumni.",
      },
      {
        title: "Networking Events",
        description:
          "Attend events to build connections before you even graduate.",
      },
      {
        title: "Skill Development",
        description:
          "Participate in workshops and webinars hosted by industry experts.",
      },
    ],
    recruiter: [
      {
        title: "Access Talent Pool",
        description:
          "Tap into a curated network of skilled graduates from top institutions.",
      },
      {
        title: "Post Job Opportunities",
        description:
          "Easily post jobs and internships targeted to the right candidates.",
      },
      {
        title: "Streamlined Hiring",
        description:
          "Filter and find candidates based on skills, major, and experience.",
      },
      {
        title: "Build Brand Presence",
        description:
          "Engage with future talent and build your company's brand on campus.",
      },
    ],
  };

  const roles = [
    {
      key: "institute",
      name: "Institute",
      icon: <School size={32} />,
      link: "/institute/register",
      desc: "Manage your alumni network with powerful, intuitive tools.",
    },
    {
      key: "alumni",
      name: "Alumni",
      icon: <Users size={32} />,
      link: "/alumni/register",
      desc: "Reconnect with peers and unlock exclusive opportunities.",
    },
    {
      key: "student",
      name: "Student",
      icon: <GraduationCap size={32} />,
      link: "/student/register",
      desc: "Find mentors and kickstart your career journey.",
    },
    {
      key: "recruiter",
      name: "Recruiter",
      icon: <Briefcase size={32} />,
      link: "/recruiter/register",
      desc: "Discover and hire top talent from a premier network.",
    },
  ];

  return (
    <div className="bg-slate-900 text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <School className="text-indigo-400" size={28} />
            <span className="text-2xl font-bold">Alum.io</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#">Contact</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/institute/login"
              className="font-medium text-slate-300 hover:text-white transition-colors duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/institute/register"
              className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden px-6 pb-4 space-y-2"
          >
            <a href="#features" className="block py-2">
              Features
            </a>
            <a href="/institute/login" className="block py-2">
              Sign In
            </a>
            <a
              href="/institute/register"
              className="block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg text-center mt-2"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-900/30"></div>
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e62ff33,transparent)]"></div>
          </div>
          <motion.div
            className="container mx-auto px-6 text-center z-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              className="text-5xl md:text-7xl font-extrabold leading-tight mb-4"
            >
              The Modern Bridge to Your{" "}
              <span className="text-indigo-400">Alumni Network</span>
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.2 },
                },
              }}
              className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8"
            >
              Alum.io provides a dynamic platform to connect institutions with
              their alumni, fostering lifelong relationships and unlocking new
              opportunities.
            </motion.p>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.4 },
                },
              }}
            >
              <Link
                to="/institute/register"
                className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105 inline-block"
              >
                Create Your Network
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ✅ MERGED Features & Roles Section */}
        <section id="features" className="py-24 bg-slate-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">
                A Unified Platform, Tailored for Everyone
              </h2>
              <p className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto">
                Alum.io is designed to empower every member of your
                institution's ecosystem with powerful, seamlessly integrated
                features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {roles.map((role, i) => (
                <motion.div
                  key={role.key}
                  className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-slate-700 text-indigo-400 p-3 rounded-full">
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {role.name}
                      </h3>
                      <p className="text-slate-400">{role.desc}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 my-6"></div>

                  <h4 className="text-lg font-semibold text-white mb-4">
                    Key Features:
                  </h4>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {featureData[role.key].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-slate-200">
                            {feature.title}
                          </h5>
                          <p className="text-slate-400 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={role.link}
                    className="mt-auto text-center w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
                  >
                    Join as {role.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-slate-800">
        <div className="container mx-auto px-6 py-12 text-center">
          <Link
            to="/"
            className="flex justify-center items-center space-x-2 mb-4"
          >
            <School className="text-indigo-400" size={28} />
            <span className="text-2xl font-bold">Alum.io</span>
          </Link>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            Connecting communities, fostering growth, and building lifelong
            relationships.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Contact
            </a>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Alum.io. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
