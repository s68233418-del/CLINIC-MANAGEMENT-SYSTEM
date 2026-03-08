import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import PatientCard from '../components/PatientCard.jsx';
import PatientNotFound from '../components/PatientNotFound.jsx';
import { Search, Filter } from 'lucide-react';

const HomePage = () => {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterGender, setFilterGender] = useState('')

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await api.get('/patients')
                console.log(res.data)
                setPatients(res.data)
            } catch (error) {
                console.log("Error fetching patients")
                console.log(error)
                toast.error("Failed to load patients")
            } finally {
                setLoading(false)
            }
        }
        fetchPatients();
    }, [])

    const filteredPatients = patients.filter((patient) => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (patient.patientId && patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()));

        
        const matchesGender = filterGender
            ? (patient.gender && patient.gender.toLowerCase() === filterGender.toLowerCase())
            : true;

        return matchesSearch && matchesGender;
    });

    return (
        <div className='max-w-7xl mx-auto'>
            {loading && <div className='text-center text-primary py-10'>
                Loading patients ...</div>}

            {!loading && patients.length > 0 && (
                <div className="flex flex-col md:flex-row gap-4 mb-6 mt-4 px-4">
                    <div className="relative w-full md:w-1/2">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            className="input input-bordered w-full pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full md:w-1/4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            className="select select-bordered w-full pl-10"
                            value={filterGender}
                            onChange={(e) => setFilterGender(e.target.value)}
                        >
                            <option value="">All Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            )}

            {!loading && patients.length === 0 && <PatientNotFound />}

            {!loading && patients.length > 0 && filteredPatients.length === 0 && (
                <div className="text-center text-gray-500 py-10">No patients found matching your search.</div>
            )}

            {filteredPatients.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4'>
                    {filteredPatients.map((patient) => (
                        <PatientCard key={patient._id} patient={patient} setPatients={setPatients} />
                    ))}
                </div>
            )}
        </div>
    )
}
export default HomePage