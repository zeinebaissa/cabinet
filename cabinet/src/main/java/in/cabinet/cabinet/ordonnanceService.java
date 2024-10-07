package in.cabinet.cabinet;

import java.util.List;

public interface ordonnanceService {
    List<Ordonnance> get();

    Ordonnance get(int id);

    void save(Ordonnance ordonnance);

    void delete(int id);

    List<Ordonnance> getByPatientId(Long patientId);




}
