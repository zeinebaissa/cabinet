package in.cabinet.cabinet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service

public class rendezvousServicempl implements rendezvousService {

    @Autowired
    private rendezvousDAO rendezvousDAO;

    @Transactional
    @Override
    public List<RendezVous> get() {
        return rendezvousDAO.get();

    }

    @Transactional
    @Override
    public RendezVous get(int id) {
        return rendezvousDAO.get(id);
    }

    @Transactional
    @Override
    public void save(RendezVous rendezVous) {
        rendezvousDAO.save(rendezVous);
    }

    @Override
    public void delete(int id) {
        rendezvousDAO.delete(id);
    }


}
