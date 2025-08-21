import { useState, useEffect } from "react";
import type { Hospital } from "../models/model";
import hospitalServices from "../features/hospitalServices";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaHospital, FaTimes } from "react-icons/fa";

type CreatingFormProp = {
    isUpdate: boolean;
    oldDate: Date;
    hospital: string;
    onAdd?: (hid: string, payload: { user: string; apptDate: Date }) => void;
    onEdit?: (appointmentId: string, payload: { hospital: string; apptDate: Date }) => void;
    onClose: () => void; // Added for closing the modal/form
    appointmentId?: string;
};

function CreatingForm({
    isUpdate,
    oldDate,
    hospital,
    onAdd,
    onEdit,
    onClose,
    appointmentId,
}: CreatingFormProp) {
    const [showList, setShowList] = useState(false);
    const [hospitalInput, setHospitalInput] = useState(hospital || "");
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>();
    const [selectedDate, setSelectedDate] = useState<Date>(oldDate);

    const filteredHospitals = hospitals.filter((h) =>
        h.name.toLowerCase().includes(hospitalInput.toLowerCase())
    );

    useEffect(() => {
        async function getHospitals() {
            try {
                const response = await hospitalServices.getHospitals();
                setHospitals(response);
            } catch (error) {
                toast.error("Failed to load hospital data.");
            }
        }
        getHospitals();
    }, []);

    useEffect(() => {
        if (isUpdate && hospitals.length > 0 && !selectedHospital) {
            const initialHos = hospitals.find((h) => h.name === hospital);
            if (initialHos) {
                setSelectedHospital(initialHos);
            }
        }
    }, [hospitals, isUpdate, hospital, selectedHospital]);

    const handleDateChange = (date: string) => {
        const newDate = new Date(date);
        setSelectedDate(newDate);
    };

    const handleHospitalChange = (hname: string) => {
        setHospitalInput(hname);
        const hos = hospitals.find((hos) => hos.name === hname);
        setSelectedHospital(hos || undefined);
    };
    
    const handleSelectHospital = (h: Hospital) => {
        setHospitalInput(h.name);
        setSelectedHospital(h);
        setShowList(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedHospital) {
            toast.error("Please select a valid hospital from the list.");
            return;
        }
        const userId = localStorage.getItem("id");
        if (!userId) {
            toast.error("User ID not found. Please log in again.");
            return;
        }

        if (isUpdate && onEdit && appointmentId) {
            const payload = { hospital: selectedHospital.id, apptDate: selectedDate };
            onEdit(appointmentId, payload);
        } else if (!isUpdate && onAdd) {
            const payload = { user: userId, apptDate: selectedDate };
            onAdd(selectedHospital.id, payload);
        }
    };

    return (
        <div className="relative max-w-lg mx-auto bg-white shadow-xl rounded-xl p-8">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                <FaTimes size={20} />
            </button>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                    {isUpdate ? "Update Your Booking" : "Book Your Appointment"}
                </h2>
                <p className="text-slate-500 mt-1">Please fill in the details below.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="apptDate" className="block text-sm font-medium text-slate-700 mb-1">
                        Select Date
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCalendarAlt className="text-slate-400" />
                        </div>
                        <input
                            type="date"
                            id="apptDate"
                            value={selectedDate.toISOString().split("T")[0]}
                            onChange={(e) => handleDateChange(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="hospital" className="block text-sm font-medium text-slate-700 mb-1">
                        Select Hospital
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaHospital className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            id="hospital"
                            value={hospitalInput}
                            onChange={(e) => handleHospitalChange(e.target.value)}
                            placeholder="Type to search for a hospital"
                            className="w-full border border-slate-300 rounded-lg pl-10 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            onFocus={() => setShowList(true)}
                            onBlur={() => setTimeout(() => setShowList(false), 200)}
                            autoComplete="off"
                        />
                        {showList && (
                            <ul className="absolute z-10 w-full max-h-48 overflow-y-auto bg-white border border-slate-300 rounded-md mt-1 shadow-lg transition-opacity duration-200">
                                {filteredHospitals.length > 0 ? (
                                    filteredHospitals.map((h) => (
                                        <li
                                            key={h.id}
                                            className="px-4 py-2 text-slate-700 hover:bg-blue-500 hover:text-white cursor-pointer"
                                            onMouseDown={() => handleSelectHospital(h)}
                                        >
                                            {h.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-slate-500 italic">No hospitals found.</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-slate-400"
                    >
                        {isUpdate ? "Save Changes" : "Confirm Booking"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatingForm;