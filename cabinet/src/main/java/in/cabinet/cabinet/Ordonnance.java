package in.cabinet.cabinet;



import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "ordonnance")
public class Ordonnance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ord")
    private Long idOrd;

    @ManyToOne
    @JoinColumn(name = "id_patient")
    private Patient patient;

    @OneToMany(mappedBy = "ordonnance")
    private List<DossierMedical> dossiersMedicaux;

    @Column(name = "medicament")
    private String medicament;
    
    public Ordonnance() {
    	
    }
	public Ordonnance(Long idOrd, Patient patient, List<DossierMedical> dossiersMedicaux, String medicament) {
		super();
		this.idOrd = idOrd;
		this.patient = patient;
		this.dossiersMedicaux = dossiersMedicaux;
		this.medicament = medicament;
	}

	public Long getIdOrd() {
		return idOrd;
	}

	public void setIdOrd(Long idOrd) {
		this.idOrd = idOrd;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public List<DossierMedical> getDossiersMedicaux() {
		return dossiersMedicaux;
	}

	public void setDossiersMedicaux(List<DossierMedical> dossiersMedicaux) {
		this.dossiersMedicaux = dossiersMedicaux;
	}

	public String getMedicament() {
		return medicament;
	}

	public void setMedicament(String medicament) {
		this.medicament = medicament;
	}

	@Override
	public String toString() {
		return "Ordonnance [idOrd=" + idOrd + ", patient=" + patient + ", dossiersMedicaux=" + dossiersMedicaux
				+ ", medicament=" + medicament + "]";
	}
    

}


