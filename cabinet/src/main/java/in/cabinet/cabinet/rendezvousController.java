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
public class rendezvousController {

    @Autowired
    private rendezvousService rendezvousService;

    @GetMapping("/rendezvous")
    public List<RendezVous> get() {
        return rendezvousService.get();
    }

    @PostMapping("/rendezvous")
    public ResponseEntity<RendezVous> createRendezVous(@RequestBody RendezVous rendezVousObj) {
        rendezvousService.save(rendezVousObj);
        return new ResponseEntity<>(rendezVousObj, HttpStatus.CREATED);
    }

    @GetMapping("/rendezvous/{id}")
    public RendezVous get(@PathVariable int id) {
        RendezVous rendezvousOBJ = rendezvousService.get(id);
        if (rendezvousOBJ == null) {
            throw new RuntimeException("Patient with id" + id + " is not found");

        }
        return rendezvousOBJ;
    }

    @DeleteMapping("/rendezvous/{id}")
    public String delete(@PathVariable int id) {
        rendezvousService.delete(id);
        return "Patient has been deleted successfully";
    }

    @PutMapping("/rendezvous")
    public RendezVous update(@RequestBody RendezVous rendezvousOBJ) {
        rendezvousService.save(rendezvousOBJ);
        return rendezvousOBJ;
    }


}