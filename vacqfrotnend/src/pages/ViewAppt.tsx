import { useEffect, useState } from "react";
import appointmentServices from "../features/appointmentServices";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import CreatingForm from "../components/CreatingForm";
import type { Appointment } from "../models/model";
import { FaPlus, FaPencilAlt, FaTrashAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// A new sub-component for when the user has no appointments
function EmptyState({ onAddNew }: { onAddNew: () => void }) {
    return (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-slate-700">No Appointments Found</h3>
            <p className="text-slate-500 mt-2 mb-6">Get started by booking your first vaccination appointment.</p>
            <button
                onClick={onAddNew}
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-300"
            >
                <FaPlus />
                Book New Appointment
            </button>
        </div>
    );
}

function ViewAppt() {
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [nextPage, setNextPage] = useState(0);
    const [limit] = useState(10);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.openModal) {
            setIsModalOpen(true);
        }
    }, [location.state]);

    useEffect(() => {
        const handleGetAppointment = async (pageNum: number, limitNum: number) => {
            try {
                const response = await appointmentServices.getMyAppt(pageNum, limitNum);
                const data = response.data;
                const formatted = data.map((appt: any) => ({
                    ...appt,
                    apptDate: new Date(appt.apptDate),
                    id: appt._id,
                }));

                setPrevPage(response.pagination?.prev?.page || 0);
                setNextPage(response.pagination?.next?.page || 0);
                setAppointments(formatted);
            } catch (error) {
                toast.error("Failed to fetch appointments.");
            }
        };

        handleGetAppointment(page, limit);
    }, [page, limit]);


    const handleAddAppointment = async (hid: string, payload: object) => {
        try {
            let response = await appointmentServices.addMyAppt(hid, payload);
            response = { ...response, apptDate: new Date(response.apptDate), id: response._id };
            setAppointments(prev => [...prev, response].sort((a, b) => b.apptDate.getTime() - a.apptDate.getTime()));
            handleCloseModal();
            toast.success("Appointment added successfully");
        } catch (err: any) { toast.error(err.response?.data?.message); }
    };
    const handleEditAppointment = async (aid: string, payload: object) => {
        try {
            let response = await appointmentServices.editMyAppt(aid, payload);
            const updatedAppt = { ...response, apptDate: new Date(response.apptDate), id: response._id };
            setAppointments(prev => prev.map(appt => appt.id === aid ? updatedAppt : appt));
            handleCloseModal();
            toast.success("Appointment updated successfully");
        } catch (err: any) { toast.error(err.response?.data?.message); }
    };
    const handleDeleteAppointment = async (aid: string) => {
        try {
            await appointmentServices.delMyAppt(aid);
            setAppointments(prev => prev.filter((appt) => appt.id !== aid));
            toast.success("Appointment deleted successfully");
        } catch (err: any) { toast.error(err.response?.data?.message); }
    };


    const handleOpenEditModal = (appt: Appointment) => {
        setEditingAppointment(appt);
        setIsModalOpen(true);
    };

    const handleOpenAddModal = () => {
        setEditingAppointment(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAppointment(null);
    };
    
    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">My Appointments</h1>
                        <p className="mt-1 text-slate-500">View and manage your vaccination schedule.</p>
                    </div>
                    <button
                        onClick={handleOpenAddModal}
                        className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-300"
                    >
                        <FaPlus />
                        Book New Appointment
                    </button>
                </header>

                <main>
                    { appointments.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-500">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Appointment Date</th>
                                        <th scope="col" className="px-6 py-3">User ID</th>
                                        <th scope="col" className="px-6 py-3">Hospital</th>
                                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appt) => (
                                        <tr key={appt.id} className="bg-white border-b hover:bg-slate-50">
                                            <td className="px-6 py-4 font-medium text-slate-900">{appt.apptDate.toLocaleDateString('en-GB')}</td>
                                            <td className="px-6 py-4 truncate max-w-xs">{appt.user}</td>
                                            <td className="px-6 py-4">{appt.hospital.name}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-4">
                                                    <button onClick={() => handleOpenEditModal(appt)} className="text-slate-500 hover:text-blue-600 transition-colors"><FaPencilAlt /></button>
                                                    <button onClick={() => handleDeleteAppointment(appt.id)} className="text-slate-500 hover:text-red-600 transition-colors"><FaTrashAlt /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState onAddNew={handleOpenAddModal} />
                    )}
                </main>
                
                {appointments.length > 0 && (
                    <footer className="flex justify-between items-center mt-6">
                        <button onClick={() => setPage(page - 1)} disabled={!prevPage} className="inline-flex items-center gap-2 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-slate-900 font-medium">
                            <FaChevronLeft /> Previous
                        </button>
                        <span className="text-sm text-slate-500">Page {page}</span>
                        <button onClick={() => setPage(page + 1)} disabled={!nextPage} className="inline-flex items-center gap-2 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-slate-900 font-medium">
                            Next <FaChevronRight />
                        </button>
                    </footer>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <CreatingForm
                        isUpdate={!!editingAppointment}
                        oldDate={editingAppointment?.apptDate || new Date()}
                        hospital={editingAppointment?.hospital.name || ""}
                        onAdd={handleAddAppointment}
                        onEdit={handleEditAppointment}
                        onClose={handleCloseModal}
                        appointmentId={editingAppointment?.id}
                    />
                </div>
            )}
        </div>
    );
}

export default ViewAppt;