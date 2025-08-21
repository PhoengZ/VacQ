import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
            <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
                <div className="font-semibold text-slate-800 text-xl lg:text-2xl">
                    <Link to='/'>Support Desk</Link>
                </div>

                <nav>
                    <ul className="flex items-center gap-2 sm:gap-4">
                        {user ? (
                            <li>
                                <button
                                    onClick={onLogout}
                                    className="flex items-center gap-2 font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300 px-3 py-2 rounded-md"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to='/login'
                                        className="flex items-center gap-2 font-medium text-slate-600 hover:bg-slate-100 transition-colors duration-300 px-4 py-2 rounded-md"
                                    >
                                        <FaSignInAlt />
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/register'
                                        className="flex items-center gap-2 font-medium bg-slate-800 text-white hover:bg-slate-700 transition-colors duration-300 px-4 py-2 rounded-md shadow-sm"
                                    >
                                        <FaUserPlus />
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;