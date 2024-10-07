package in.cabinet.cabinet;

import java.util.List;

public interface dossierService {
    List<DossierMedical> get();

    DossierMedical get(int id);

    void save(DossierMedical DossierMedical);

    void delete(int id);



}
