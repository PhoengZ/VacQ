import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {
            email,
            password
        };
        dispatch(login(userData));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
                        <FaSignInAlt /> Welcome Back
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Please sign in to access your account.
                    </p>
                </div>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            name="email" 
                            id="email" 
                            value={email} 
                            onChange={onChange}
                            placeholder="you@example.com" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                        </label>
                        <input 
                            type="password" 
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={onChange} 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>
                    <div>
                        <button 
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-300 disabled:bg-slate-400"
                            disabled={isLoading}
                        >
                            Sign in
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default Login;