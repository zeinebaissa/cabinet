package in.cabinet.cabinet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service

public class ordonnanceServicempl implements ordonnanceService {

    @Autowired
    private ordonnanceDAO ordonnanceDAO;


    @Transactional
    @Override
    public List<Ordonnance> get() {
        return ordonnanceDAO.get();


    }

    @Transactional
    @Override
    public Ordonnance get(int id) {
        return ordonnanceDAO.get(id);
    }

    @Transactional
    @Override
    public void save(Ordonnance ordonnance) {
        ordonnanceDAO.save(ordonnance);
    }

    @Override
    public void delete(int id) {
        ordonnanceDAO.delete(id);
    }

    @Override
    public List<Ordonnance> getByPatientId(Long patientId) {
        return ordonnanceDAO.findByPatientId(patientId);
    }


}
