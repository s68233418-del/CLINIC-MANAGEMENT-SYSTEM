import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Loader2, Trash2, ArrowLeft } from "lucide-react";

const PatientDetailPage = () => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await api.get(`/patients/${id}`);
                setPatient(res.data);
            } catch (error) {
                console.error("Error fetching patient", error);
                toast.error("Failed to fetch the patient");
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this patient?")) return;

        try {
            await api.delete(`/patients/${id}`);
            toast.success("Patient deleted successfully");
            navigate("/");
        } catch (error) {
            console.error("Error deleting patient", error);
            toast.error("Failed to delete patient");
        }
    };

    const handleSave = async () => {
        if (!patient.name.trim()) {
            toast.error("Please add name");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/patients/${id}`, {
                name: patient.name,
                age: Number(patient.age),
                gender: patient.gender,
                phoneNo: patient.phoneNo,
                address: patient.address,
                medicalHistory: patient.medicalHistory,
                bloodGroup: patient.bloodGroup,
                allergies: patient.allergies
            });

            toast.success("Patient updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Error updating patient", error);
            toast.error("Failed to update patient");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <Loader2 className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">

                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeft className="h-5 w-5" />Back to Patients
                        </Link>

                        <button onClick={handleDelete} className="btn btn-error btn-outline" >
                            <Trash2 className="h-5 w-5" /> Delete Patient
                        </button>
                    </div>

                    {/* FORM CARD */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'> Name </span>
                                </label>
                                <input type="text" placeholder='Patient Name' className='input input-bordered' value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} />
                            </div>

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'> Age </span>
                                </label>
                                <input type="number" placeholder='Patient Age' className='input input-bordered' value={patient.age} onChange={(e) => setPatient({ ...patient, age: e.target.value })} />
                            </div>

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'> Gender </span>
                                </label>
                                <select className='select select-bordered' value={patient.gender} onChange={(e) => setPatient({ ...patient, gender: e.target.value })} >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'> Phone No </span>
                                </label>
                                <input type="text" placeholder='Phone Number' className='input input-bordered' value={patient.phoneNo} onChange={(e) => setPatient({ ...patient, phoneNo: e.target.value })} />
                            </div>

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'> Address </span>
                                </label>
                                <textarea className='textarea textarea-bordered' placeholder='Address' value={patient.address} onChange={(e) => setPatient({ ...patient, address: e.target.value })} ></textarea>
                            </div>

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'> Medical History </span>
                                </label>
                                <textarea className='textarea textarea-bordered' placeholder='Medical History' value={patient.medicalHistory} onChange={(e) => setPatient({ ...patient, medicalHistory: e.target.value })} ></textarea>
                            </div>

                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'> Blood Group </span>
                                </label>
                                <select className='select select-bordered' value={patient.bloodGroup} onChange={(e) => setPatient({ ...patient, bloodGroup: e.target.value })} >
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                </select>
                            </div>

                            <div className='form-control mb-6'>
                                <label className='label'>
                                    <span className='label-text'> Allergies </span>
                                </label>
                                <textarea className='textarea textarea-bordered' placeholder='Allergies' value={patient.allergies} onChange={(e) => setPatient({ ...patient, allergies: e.target.value })} ></textarea>
                            </div>

                            {/* ACTION */}
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave} >
                                    {saving ? "Saving ..." : "Save Changes"}
                                </button>
                            </div> </div> </div> </div> </div> </div>
    );
};
export default PatientDetailPage;