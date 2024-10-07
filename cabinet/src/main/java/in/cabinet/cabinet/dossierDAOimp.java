package in.cabinet.cabinet;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;


import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.query.Query;

import jakarta.persistence.EntityManager;

@Repository

public class dossierDAOimp implements dossierDAO {

    @Autowired
    private EntityManager entityManager;


    @Override
    public List<DossierMedical> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<DossierMedical> query= currentSession.createQuery("from DossierMedical",DossierMedical.class);
        List<DossierMedical> list=query.getResultList();
        return list;


    }

    @Override
    public DossierMedical get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        DossierMedical dossierOBJ= currentSession.get(DossierMedical.class,id);
        return dossierOBJ;
    }

    @Override
    public void save(DossierMedical DossierMedical) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.merge(DossierMedical);
    }


    @Override
    @Transactional

    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        DossierMedical dossierOBJ= currentSession.get(DossierMedical.class,id);
        currentSession.remove(dossierOBJ);

    }


}
