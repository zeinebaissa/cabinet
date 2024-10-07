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
public class ordonnanceController {

    @Autowired
    private ordonnanceService ordonnanceService;
    private patientService patientService;

    @GetMapping("/ordonnance")
    public List<Ordonnance> get() {
        return ordonnanceService.get();
    }

    @PostMapping("/ordonnance")
    public Ordonnance save(@RequestBody Ordonnance ordonnanceObj) {
        ordonnanceService.save(ordonnanceObj);
        return ordonnanceObj;
    }

    @GetMapping("/patient/{id}/ordonnances")
    public ResponseEntity<List<Ordonnance>> getOrdonnancesByPatientId(@PathVariable Long id) {
        List<Ordonnance> ordonnances = ordonnanceService.getByPatientId(id);
        if (ordonnances.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ordonnances, HttpStatus.OK);
    }

    @GetMapping("/ordonnance/{id}")
    public ResponseEntity<Ordonnance> getOrdonnance(@PathVariable int id) {
        Ordonnance ordonnanceOBJ = ordonnanceService.get(id);
        if (ordonnanceOBJ == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(ordonnanceOBJ, HttpStatus.OK);
    }

    @DeleteMapping("/ordonnance/{id}")
    public String delete(@PathVariable int id) {
        ordonnanceService.delete(id);
        return "Patient has been deleted successfully";
    }

    @PutMapping("/ordonnance")
    public Ordonnance update(@RequestBody Ordonnance ordonnanceOBJ) {
        ordonnanceService.save(ordonnanceOBJ);
        return ordonnanceOBJ;
    }


}