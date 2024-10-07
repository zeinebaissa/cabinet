package in.cabinet.cabinet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@Repository
@RestController
@RequestMapping("/api")
public class patientController {

    @Autowired
    private patientService patientService;

    @GetMapping("/patient")
    public List<Patient> get() {
        return patientService.get();
    }

    @PostMapping("/patient")
    public Patient save(@RequestBody Patient patientObj) {
        patientService.save(patientObj);
        return patientObj;
    }

    @GetMapping("/patient/{id}")
    public Patient get(@PathVariable int id) {
        Patient patientOBJ = patientService.get(id);
        if (patientOBJ == null) {
            throw new RuntimeException("Patient with id" + id + " is not found");

        }
        return patientOBJ;
    }

    @DeleteMapping("/patient/{id}")
    public String delete(@PathVariable int id) {
        patientService.delete(id);
        return "Patient has been deleted successfully";
    }

    @PatchMapping("/patient/{id}")
    public ResponseEntity<Patient> updatePatientPartial(@PathVariable int id, @RequestBody Patient patient) {
        Patient existingPatient = patientService.get(id);

        // Update only the fields that are provided in the request body
        if (patient.getNom() != null) {
            existingPatient.setNom(patient.getNom());
        }
        if (patient.getPrenom() != null) {
            existingPatient.setPrenom(patient.getPrenom());
        }
        if (patient.getTelephone() != null) {
            existingPatient.setTelephone(patient.getTelephone());
        }
        if (patient.getSexe() != null) {
            existingPatient.setSexe(patient.getSexe());
        }
        if (patient.getDateDeNaissance() != null) {
            existingPatient.setDateDeNaissance(patient.getDateDeNaissance());
        }

        // Save the updated patient
        patientService.save(existingPatient);

        return new ResponseEntity<>(existingPatient, HttpStatus.OK);
    }



}