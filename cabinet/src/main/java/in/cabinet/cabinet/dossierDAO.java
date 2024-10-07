package in.cabinet.cabinet;

import java.util.List;

public interface dossierDAO {

    List<DossierMedical> get();

    DossierMedical get(int id);

    void save(DossierMedical dossierMedical);

    void delete(int id);


}
