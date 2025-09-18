import { useEffect } from 'react';
import { Link } from "react-router-dom";

export default function App() {

    const featureData = {
        institute: [
            { title: "Centralized Database", description: "Manage all alumni data in one secure, easy-to-access location." },
            { title: "Engagement Analytics", description: "Track alumni engagement, event attendance, and fundraising campaigns." },
            { title: "Event Management", description: "Organize reunions, webinars, and networking events seamlessly." },
            { title: "Communication Hub", description: "Send targeted newsletters, updates, and announcements with ease." }
        ],
        alumni: [
            { title: "Reconnect & Network", description: "Find and connect with classmates and professionals in your field." },
            { title: "Career Opportunities", description: "Access an exclusive job board and career development resources." },
            { title: "Mentor & Give Back", description: "Offer mentorship to current students and contribute to your alma mater." },
            { title: "Stay Updated", description: "Receive news and updates about your institution and fellow alumni." }
        ],
        student: [
            { title: "Alumni Mentorship", description: "Connect with experienced alumni for career guidance and support." },
            { title: "Internship Portal", description: "Discover exclusive internship opportunities posted by alumni." },
            { title: "Networking Events", description: "Attend events to build connections before you even graduate." },
            { title: "Skill Development", description: "Participate in workshops and webinars hosted by industry experts." }
        ],
        recruiter: [
            { title: "Access Talent Pool", description: "Tap into a curated network of skilled graduates from top institutions." },
            { title: "Post Job Opportunities", description: "Easily post jobs and internships targeted to the right candidates." },
            { title: "Streamlined Hiring", description: "Filter and find candidates based on skills, major, and experience." },
            { title: "Build Brand Presence", description: "Engage with future talent and build your company's brand on campus." }
        ]
    };

    const icons = {
        institute: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
        alumni: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.273-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.273.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        student: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
        recruiter: <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    };

    const userTypes = Object.keys(featureData);

    // Effect for GSAP parallax scroll
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                document.body.appendChild(script);
            });
        };

        let gsapContext;

        loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js")
            .then(() => loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"))
            .then(() => {
                gsapContext = window.gsap.context(() => {
                    window.gsap.registerPlugin(ScrollTrigger);
                    const cards = window.gsap.utils.toArray(".c-card");
                    if (cards.length === 0) return;
                    const lastCard = cards[cards.length - 1];
                    const lastCardST = ScrollTrigger.create({
                        trigger: lastCard,
                        start: "center center",
                    });
                    cards.forEach((card, index) => {
                        const scale = index === cards.length - 1 ? 1 : 0.85;
                        const scaleDown = window.gsap.to(card, { scale: scale });
                        ScrollTrigger.create({
                            trigger: card,
                            start: "top top",
                            end: () => lastCardST.start,
                            pin: true,
                            pinSpacing: false,
                            scrub: 0.5,
                            animation: scaleDown,
                            invalidateOnRefresh: true,
                        });
                    });
                });
            })
            .catch(console.error);

        return () => {
            if (gsapContext) {
                gsapContext.revert();
            }
        };
    }, []);

    // Effect for 3D tilt cards has been removed from here

    const logoSvg = (
        <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18.809 16.4899C20.916 15.0199 21.9059 12.4469 21.2469 9.9409C20.5879 7.4349 18.4559 5.58691 15.9329 5.21091C13.4099 4.83491 10.8419 5.92391 9.4319 8.01891" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.19092 7.51001C3.08392 8.98001 2.09401 11.553 2.75301 14.059C3.41201 16.565 5.54401 18.413 8.06701 18.789C10.59 19.165 13.158 18.076 14.568 15.981" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <>
            {/* The CSS for the tilt-card and tilt-card__gloss has been removed */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .l-cards {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .c-card {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 24px;
          margin-top: 20px;
          width: 100%;
          height: 85vh;
          min-height: 550px;
          background-color: white;
          border-radius: 1.5rem; /* 24px */
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          transform-origin: center top;
        }

        .c-card__description {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
        }

        .c-card__title {
          font-size: 2.25rem; /* 36px */
          font-weight: 700;
          margin-bottom: 1.5rem; /* 24px */
          text-transform: capitalize;
        }

        .c-card__excerpt {
          font-size: 1rem; /* 16px */
          line-height: 1.6;
        }

        .c-card__figure {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f1f5f9; /* slate-100 */
          border-top-right-radius: 1.5rem;
          border-bottom-right-radius: 1.5rem;
        }
      `}</style>
            <div className="bg-gray-50 text-gray-800">
                <header className="bg-white shadow-sm sticky top-0 z-50">
                    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <a href="#" className="flex items-center space-x-2">
                            {logoSvg}
                            <span className="text-2xl font-bold text-gray-900">Alum.io</span>
                        </a>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Features</a>
                            <a href="#register" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Register</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Contact</a>
                        </div>
                        <a href="#register" className="hidden md:block bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">Get Started</a>
                        <button className="md:hidden p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </nav>
                </header>

                <main>
                    <section className="bg-gradient-to-br from-slate-50 to-slate-200 py-20 md:py-32">
                        <div className="container mx-auto px-6 text-center">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                                The Modern Bridge to Your Alumni Network
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                                Alum.io provides a centralized, dynamic platform to connect institutions with their alumni, fostering lifelong relationships and unlocking new opportunities for growth.
                            </p>
                            <a href="#register" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 inline-block">
                                Join Your Community
                            </a>
                        </div>
                    </section>

                    <section id="register" className="py-20 bg-slate-100">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to Get Started?</h2>
                                <p className="text-lg text-gray-600 mt-2">Join the Alum.io network today. Select your role to begin.</p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <div className="no-tilt-card"> {/* Renamed class to avoid conflict */}
                                    <div className="bg-white p-8 rounded-xl shadow-md text-center flex flex-col items-center relative overflow-hidden h-full">
                                        <div className="text-blue-600 mb-4 h-12 w-12">{icons.institute}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Institute</h3>
                                        <p className="text-gray-600 mb-6 flex-grow">Manage your alumni network with powerful, intuitive tools.</p>
                                        <Link
                                            to="/institute/register"
                                            className="font-semibold text-blue-600 hover:text-blue-800 group transition-all duration-300"
                                        >
                                            Register as Institute
                                            <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                                                &rarr;
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="no-tilt-card">
                                    <div className="bg-white p-8 rounded-xl shadow-md text-center flex flex-col items-center relative overflow-hidden h-full">
                                        <div className="text-blue-600 mb-4 h-12 w-12">{icons.alumni}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Alumni</h3>
                                        <p className="text-gray-600 mb-6 flex-grow">Reconnect with peers and unlock exclusive opportunities.</p>
                                        <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 group transition-all duration-300">
                                            Register as Alumni <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="no-tilt-card">
                                    <div className="bg-white p-8 rounded-xl shadow-md text-center flex flex-col items-center relative overflow-hidden h-full">
                                        <div className="text-blue-600 mb-4 h-12 w-12">{icons.student}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Student</h3>
                                        <p className="text-gray-600 mb-6 flex-grow">Find mentors and kickstart your career journey.</p>
                                        <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 group transition-all duration-300">
                                            Register as Student <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="no-tilt-card">
                                    <div className="bg-white p-8 rounded-xl shadow-md text-center flex flex-col items-center relative overflow-hidden h-full">
                                        <div className="text-blue-600 mb-4 h-12 w-12">{icons.recruiter}</div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Recruiter</h3>
                                        <p className="text-gray-600 mb-6 flex-grow">Discover and hire top talent from a premier network.</p>
                                        <a href="#" className="font-semibold text-blue-600 hover:text-blue-800 group transition-all duration-300">
                                            Register as Recruiter <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="features" className="py-20 bg-white">
                        <div className="container mx-auto px-6 text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">A Unified Platform for Everyone</h2>
                            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Scroll to explore the tailored features for every member of your institution&apos;s ecosystem.</p>
                        </div>
                        <div className="l-cards">
                            {userTypes.map((userType) => (
                                <div className="c-card" key={userType}>
                                    <div className="c-card__description">
                                        <h3 className="c-card__title">For {userType}s</h3>
                                        <div className="c-card__excerpt">
                                            {featureData[userType].map((feature, index) => (
                                                <div key={index} className="mb-4">
                                                    <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                                                    <p className="text-gray-600">{feature.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <figure className="c-card__figure">
                                        <div className="w-24 h-24 md:w-40 md:h-40 text-blue-500 opacity-80">
                                            {icons[userType]}
                                        </div>
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <footer className="bg-gray-800 text-white">
                    <div className="container mx-auto px-6 py-12">
                        <div className="text-center">
                            <a href="#" className="flex justify-center items-center space-x-2 mb-4">
                                {logoSvg}
                                <span className="text-2xl font-bold">Alum.io</span>
                            </a>
                            <p className="text-gray-400 max-w-md mx-auto mb-6">Connecting communities, fostering growth, and building lifelong relationships.</p>
                            <div className="flex justify-center space-x-6 mb-8">
                                <a href="#" className="hover:text-blue-400 transition-colors">About</a>
                                <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
                                <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
                                <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
                            </div>
                            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Alum.io. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}