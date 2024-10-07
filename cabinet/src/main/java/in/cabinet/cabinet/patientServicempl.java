package in.cabinet.cabinet;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service

public class patientServicempl implements patientService {
	
	@Autowired
	private patientDAO patientDAO;
	
	@Transactional
	@Override
	public List<Patient> get() {
		return patientDAO.get();
		

	}
	
	@Transactional
	@Override
	public Patient get(int id) {
		return patientDAO.get(id);
	}
	
	@Transactional
	@Override
	public void save(Patient Patient) {
		patientDAO.save(Patient);
	}

	@Override
	public void delete(int id) {
		patientDAO.delete(id);
	}


}
