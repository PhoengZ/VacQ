import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import type { RootState, AppDispatch } from '../app/store';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        role: 'user' // Default role, removed from UI for security and simplicity
    });

    const { name, email, password, password2, role } = formData;

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user, isLoading, isSuccess, isError, message } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password,
                role
            };
            dispatch(register(userData));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
                        <FaUserPlus /> Create an Account
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Get started by filling out the form below.
                    </p>
                </div>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            id="name" 
                            name="name" 
                            value={name} 
                            onChange={onChange} 
                            placeholder="Enter your name" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            id="email" 
                            name="email" 
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
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={onChange} 
                            placeholder="Enter a strong password" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password2" className="block text-sm font-medium text-slate-700 mb-1">
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            id="password2" 
                            name="password2" 
                            value={password2} 
                            onChange={onChange} 
                            placeholder="Confirm your password" 
                            required 
                        />
                    </div>
                    <div>
                        <button 
                            type="submit"
                            className="w-full flex justify-center items-center gap-2 bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-300 disabled:bg-slate-400"
                            disabled={isLoading}
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;