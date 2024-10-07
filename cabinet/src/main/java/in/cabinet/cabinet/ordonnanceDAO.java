package in.cabinet.cabinet;

import java.util.List;

public interface ordonnanceDAO {

    List<Ordonnance> get();

    Ordonnance get(int id);

    void save(Ordonnance Ordonnance);

    void delete(int id);

    List<Ordonnance> findByPatientId(Long patientId);


}
