import Patient from "../models/patient.js";

export const addPatient = async (req, res) => {
    try {
        const patientData = req.body;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let result = '';

        for (let i = 0; i < 2; i++) {
            result += letters.charAt(Math.floor(Math.random() * letters.length));
        }

        for (let i = 0; i < 2; i++) {
            result += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        patientData.patientId = result;

        const patient = new Patient(patientData);
        const savedPatient = await patient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
