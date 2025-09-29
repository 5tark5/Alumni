import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRegisterMutation } from "../redux/api/instituteApiSlice";
import { setCredentials } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import { Mail, Lock, User, Phone, School, LogIn } from 'lucide-react';

// Reusable Input Field
const FormInput = ({ id, type, value, onChange, placeholder, icon: Icon }) => (
    <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            required
        />
    </div>
);

export default function InstituteRegister() {
    const [name, setName] = useState("");
    const [instituteEmail, setEmail] = useState("");
    const [institutePhone, setPhone] = useState("");
    const [institutePassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const { instituteInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (instituteInfo) navigate("/institute/dashboard");
    }, [navigate, instituteInfo]);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (institutePassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const res = await register({ name, instituteEmail, institutePhone, institutePassword }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/institute/dashboard");
            toast.success("Registration successful!");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                {/* Left Side */}
                <div className="p-12 hidden lg:flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                        <School size={60} className="text-indigo-400 mb-6" />
                        <h1 className="text-4xl font-bold leading-tight mb-4">
                            Join a Network of Leading Institutions.
                        </h1>
                        <p className="text-slate-400">
                           Create your institute's profile to begin connecting with your alumni community like never before.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side - Form */}
                <div className="p-12">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2">Create an Account</motion.h2>
                        <motion.p variants={itemVariants} className="text-slate-400 mb-8">Get started in just a few clicks.</motion.p>
                        
                        <form onSubmit={handleRegister} className="space-y-4">
                            <motion.div variants={itemVariants}>
                                <FormInput id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Institution Name" icon={User} />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <FormInput id="email" type="email" value={instituteEmail} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" icon={Mail} />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <FormInput id="phone" type="tel" value={institutePhone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" icon={Phone} />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <FormInput id="password" type="password" value={institutePassword} onChange={(e) => setPassword(e.target.value)} placeholder="Password" icon={Lock} />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <FormInput id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" icon={Lock} />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all disabled:bg-indigo-400 disabled:cursor-not-allowed group">
                                    <span className="group-hover:scale-105 transition-transform">{isLoading ? "Creating Account..." : "Create Account"}</span>
                                    <LogIn className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </form>

                        <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link to="/institute/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                                Sign In
                            </Link>
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}