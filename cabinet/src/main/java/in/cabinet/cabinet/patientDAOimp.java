package in.cabinet.cabinet;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;


import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.hibernate.query.Query;

import jakarta.persistence.EntityManager;

@Repository

public class patientDAOimp implements patientDAO {

	@Autowired
	private EntityManager entityManager;


	@Override
	public List<Patient> get() {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Patient> query= currentSession.createQuery("from Patient",Patient.class);
		List<Patient> list=query.getResultList();
		return list;


	}

	@Override
	public Patient get(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Patient patientOBJ= currentSession.get(Patient.class,id);
		return patientOBJ;
	}

	@Override
	public void save(Patient Patient) {
	    Session currentSession = entityManager.unwrap(Session.class);
	    currentSession.merge(Patient);
	}


	@Override
	@Transactional

	public void delete(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Patient patientOBJ= currentSession.get(Patient.class,id);
		currentSession.remove(patientOBJ);

	}


}
