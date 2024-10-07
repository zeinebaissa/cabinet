package in.cabinet.cabinet;

import java.util.List;

public interface rendezvousService {
    List<RendezVous> get();

    RendezVous get(int id);

    void save(RendezVous rendezVous);

    void delete(int id);



}
