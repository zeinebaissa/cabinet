package in.cabinet.cabinet;

import java.util.List;

public interface patientService {
	List<Patient> get();
	
	Patient get(int id);
	
	void save(Patient Patient);
	
	void delete(int id);



}
