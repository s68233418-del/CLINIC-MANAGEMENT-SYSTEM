import { Link, useLocation } from "react-router";
import { UserCircle, Edit2, Trash2 } from "lucide-react";
import { formatData } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const PatientCard = ({ patient, setPatients }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === `/patient/${patient._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/patients/${patient._id}`);
      setPatients((prev) => prev.filter((p) => p._id !== patient._id));
      toast.success("Patient deleted successfully");
    } catch {
      toast.error("Failed to delete patient");
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      {/* CARD */}
      <Link to={`/patient/${patient._id}`} className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200 ${isActive ? "border-primary shadow-lg" : "border-base-300"} hover:border-primary hover:shadow-xl`} >
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <p className="text-xs text-base-content/60 font-semibold truncate">
            {patient.patientId || "N/A"}
          </p>
          <span className="badge badge-secondary"> {patient.age} yrs, {patient.gender} </span>
        </div>
        {/* Patient Info */}
        <div className="mt-4 space-y-2">
          {/* Name */}
          <div className="flex items-center gap-2">
            <UserCircle className="size-4 text-primary" />
            <p className="font-medium text-base-content line-clamp-1">
              {patient.name} </p>
          </div>
          {/* Phone */}
          <div className="flex items-center gap-2 text-base-content/70">
            <p className="text-sm line-clamp-1"> {patient.phoneNo} </p>
          </div>
          {/* Medical History Snippet */}
          {patient.medicalHistory && (
            <div className="mt-2 text-xs text-base-content/60 bg-base-200 p-2 rounded-md line-clamp-2 border border-base-300">
              <span className="font-semibold text-base-content/80 text-xs">History: </span>
              {patient.medicalHistory}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-base-content/60">
            {formatData(new Date(patient.createdAt))}
          </span>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* EDIT */}
            <div className="tooltip tooltip-warning" data-tip="Edit patient">
              <Edit2 className="size-4 text-warning hover:scale-110 transition" />
            </div>

            {/* DELETE */}
            <div className="tooltip tooltip-error" data-tip="Delete patient">
              <button onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
                className="text-error hover:scale-110 transition" >
                <Trash2 className="size-4" />
              </button>
            </div> </div> </div> </Link>

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (<dialog className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-error flex items-center gap-2">
            <Trash2 className="size-5" /> Delete Patient </h3>
          <p className="py-4 text-base-content/70">
            Are you sure you want to delete
            <span className="font-semibold text-base-content">
              {" "}“{patient.name}” </span>? <br /> This action cannot be undone. </p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)} > Cancel </button>
            <button className="btn btn-error flex items-center gap-2" onClick={handleDelete}> <Trash2 className="size-4" /> Delete </button>
          </div> </div> </dialog>
      )}
    </>
  );
};
export default PatientCard;