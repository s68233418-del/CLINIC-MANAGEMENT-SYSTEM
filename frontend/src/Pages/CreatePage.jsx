import api from '../lib/axios';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const CreatePage = () => {
   const [name, setName] = useState('');
   const [age, setAge] = useState('');
   const [gender, setGender] = useState('Male');
   const [phoneNo, setPhoneNo] = useState('');
   const [address, setAddress] = useState('');
   const [medicalHistory, setMedicalHistory] = useState('');
   const [bloodGroup, setBloodGroup] = useState('A+');
   const [allergies, setAllergies] = useState('');
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         await api.post('/patients', {
            name,
            age: Number(age),
            gender,
            phoneNo,
            address,
            medicalHistory,
            bloodGroup,
            allergies
         });
         toast.success('Patient created successfully!');
         navigate('/');
      } catch (error) {
         console.log('Error creating patient', error);
         toast.error('Failed to create patient.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className='min-h-screen bg-base-200'>
         <div className='container mx-auto px-4 py-8'>
            <div className='max-w-2xl mx-auto'>
               <Link to={'/'} className='btn btn-ghost mb-6'>
                  <ArrowLeft className='size-5' /> Back to Patients
               </Link>
               <div className='card bg-base-100'>
                  <div className='card-body'>
                     <h2 className='card-title text-2xl mb-4'> Create New Patient </h2>
                     <form onSubmit={handleSubmit}>
                        <div className='form-control mb-4'>
                           <label className='label'>
                              <span className='label-text'> Name </span>
                           </label>
                           <input type="text" placeholder='Patient Name' className='input input-bordered' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='form-control mb-4'>
                           <label className='label'>
                              <span className='label-text'> Age </span>
                           </label>
                           <input type="number" placeholder='Patient Age' className='input input-bordered' value={age} onChange={(e) => setAge(e.target.value)} required />
                        </div>
                        <div className='form-control mb-4'>
                           <label className='label'>
                              <span className='label-text'> Gender </span>
                           </label>
                           <select className='select select-bordered' value={gender} onChange={(e) => setGender(e.target.value)} required>
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                           </select>
                        </div>
                        <div className='form-control mb-4'>
                           <label className='label'>
                              <span className='label-text'> Phone No </span>
                           </label>
                           <input type="text" placeholder='Phone Number' className='input input-bordered' value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                        </div>
                        <div className='form-control mb-4'>
                           <label className='label'>
                              <span className='label-text'> Address </span>
                           </label>
                           <textarea className='textarea textarea-bordered' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
                        </div>
                        <div className='form-control mb-4'>
                           <label className='label'>
                              <span className='label-text'> Medical History </span>
                           </label>
                           <textarea className='textarea textarea-bordered' placeholder='Medical History' value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} required></textarea>
                        </div>
                        <div className='form-control mb-4'>
                           <label className='label'>
                              <span className='label-text'> Blood Group </span>
                           </label>
                           <select className='select select-bordered' value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
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
                        <div className='form-control mb-4'>
                           <label className='label'>
                              <span className='label-text'> Allergies </span>
                           </label>
                           <textarea className='textarea textarea-bordered' placeholder='Allergies' value={allergies} onChange={(e) => setAllergies(e.target.value)} required></textarea>
                        </div>
                        <div className='card-actions justify-end'>
                           <button type='submit' className='btn btn-primary' disabled={loading}>
                              {loading ? "Creating ..." : "Create Patient"}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
export default CreatePage