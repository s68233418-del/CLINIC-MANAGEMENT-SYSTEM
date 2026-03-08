import express from "express";
import Patient from "../models/patient.js";
import { addPatient, getPatients, updatePatient, deletePatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/", addPatient);

router.get("/", getPatients);

router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.json(patient);
  } catch (error) {
    res.status(404).json({ message: "Patient not found" });
  }
});

router.put("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;
