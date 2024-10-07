package in.cabinet.cabinet;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;


import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.query.Query;

import jakarta.persistence.EntityManager;

@Repository
@Transactional
public class rendezvousDAOimp implements rendezvousDAO {

    @Autowired
    private EntityManager entityManager;


    @Override
    public List<RendezVous> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<RendezVous> query= currentSession.createQuery("from RendezVous ",RendezVous.class);
        List<RendezVous> list=query.getResultList();
        return list;


    }

    @Override
    public RendezVous get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        RendezVous rendezvousOBJ= currentSession.get(RendezVous.class,id);
        return rendezvousOBJ;
    }

    @Override
    @Transactional
    public void save(RendezVous rendezvous) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.merge(rendezvous);
    }


    @Override
    @Transactional

    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        RendezVous rendezvousOBJ= currentSession.get(RendezVous.class,id);
        currentSession.remove(rendezvousOBJ);

    }


}
