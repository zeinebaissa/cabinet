package in.cabinet.cabinet;

import java.util.List;

import jakarta.persistence.TypedQuery;
import org.springframework.transaction.annotation.Transactional;


import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.query.Query;

import jakarta.persistence.EntityManager;

@Repository

public class ordonnanceDAOimp implements ordonnanceDAO {

    @Autowired
    private EntityManager entityManager;


    @Override
    public List<Ordonnance> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Ordonnance> query= currentSession.createQuery("from Ordonnance",Ordonnance.class);
        List<Ordonnance> list=query.getResultList();
        return list;

    }

    @Override
    public Ordonnance get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Ordonnance ordonnanceOBJ= currentSession.get(Ordonnance.class,id);
        return ordonnanceOBJ;
    }

    @Override
    public void save(Ordonnance ordonnance) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.merge(ordonnance);
    }


    @Override
    @Transactional

    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        Ordonnance ordonnanceOBJ= currentSession.get(Ordonnance.class,id);
        currentSession.remove(ordonnanceOBJ);

    }

    public List<Ordonnance> findByPatientId(Long patientId) {
        TypedQuery<Ordonnance> query = entityManager.createQuery(
                "SELECT o FROM Ordonnance o WHERE o.patient.id = :patientId", Ordonnance.class);
        query.setParameter("patientId", patientId);
        return query.getResultList();
    }



}
