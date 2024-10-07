package in.cabinet.cabinet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@Repository
@RestController
@RequestMapping("/api")
public class dossierController {

    @Autowired
    private dossierService dossierService;

    @GetMapping("/dossier_medical")
    public List<DossierMedical> get() {
        return dossierService.get();
    }

    @PostMapping("/dossier_medical")
    public DossierMedical save(@RequestBody DossierMedical dossierObj) {
        dossierService.save(dossierObj);
        return dossierObj;
    }

    @GetMapping("/dossier_medical/{id}")
    public DossierMedical get(@PathVariable int id) {
        DossierMedical dossierOBJ = dossierService.get(id);
        if (dossierOBJ == null) {
            throw new RuntimeException("Patient with id" + id + " is not found");

        }
        return dossierOBJ;
    }

    @DeleteMapping("/dossier_medical/{id}")
    public String delete(@PathVariable int id) {
        dossierService.delete(id);
        return "Patient has been deleted successfully";
    }

    @PatchMapping("/dossier_medical")
    public DossierMedical update(@RequestBody DossierMedical dossierOBJ) {
        dossierService.save(dossierOBJ);
        return dossierOBJ;
    }


}