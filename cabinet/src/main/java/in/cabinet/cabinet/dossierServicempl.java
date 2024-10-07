package in.cabinet.cabinet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service

public class dossierServicempl implements dossierService {

    @Autowired
    private dossierDAO dossierDAO;

    @Transactional
    @Override
    public List<DossierMedical> get() {
        return dossierDAO.get();


    }

    @Transactional
    @Override
    public DossierMedical get(int id) {
        return dossierDAO.get(id);
    }

    @Transactional
    @Override
    public void save(DossierMedical DossierMedical) {
        dossierDAO.save(DossierMedical);
    }

    @Override
    public void delete(int id) {
        dossierDAO.delete(id);
    }


}
