package in.cabinet.cabinet;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;


import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.query.Query;

import jakarta.persistence.EntityManager;

@Repository

public class userDAOimp implements userDAO {

    @Autowired
    private EntityManager entityManager;


    @Override
    public List<User> get() {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<User> query= currentSession.createQuery("from User",User.class);
        List<User> list=query.getResultList();
        return list;


    }

    @Override
    public User get(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        User UserOBJ= currentSession.get(User.class,id);
        return UserOBJ;
    }

    @Override
    public void save(User User) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.merge(User);
    }


    @Override
    @Transactional

    public void delete(int id) {
        Session currentSession = entityManager.unwrap(Session.class);
        User userOBJ= currentSession.get(User.class,id);
        currentSession.remove(userOBJ);

    }


}
