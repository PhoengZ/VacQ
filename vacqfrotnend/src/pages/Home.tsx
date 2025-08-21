import { Link } from "react-router-dom";
import { FaCalendarPlus, FaTicketAlt } from "react-icons/fa";

function Home() {
    return (
        <>
            <section className='w-full min-h-screen flex items-center justify-center bg-slate-50 px-4'>
                <div className='max-w-2xl w-full text-center'>
                    <h1 className="font-extrabold text-4xl text-slate-800 sm:text-5xl lg:text-6xl tracking-tight">
                        Vac Q: Vaccine Booking
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 sm:text-xl">
                        Secure your spot and stay protected. Schedule your vaccination appointment today.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to='/appointments' 
                            state={{ openModal: true }} 
                            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <FaCalendarPlus />
                            Create New Appointment
                        </Link>
                        <Link 
                            to='/appointments' 
                            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 text-lg font-semibold text-slate-700 bg-transparent border border-slate-300 rounded-lg hover:bg-slate-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                        >
                            <FaTicketAlt />
                            View My Appointments
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;