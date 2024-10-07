package in.cabinet.cabinet;

import java.util.List;

public interface rendezvousDAO {

    List<RendezVous> get();

    RendezVous get(int id);

    void save(RendezVous Rendezvous);

    void delete(int id);




}
