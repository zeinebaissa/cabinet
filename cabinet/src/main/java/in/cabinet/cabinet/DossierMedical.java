package in.cabinet.cabinet;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "dossier_medical")
public class DossierMedical {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_dossier")
    private Long idDossier;

    @ManyToOne
    @JoinColumn(name = "id_patient")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "id_ordonnance")
    private Ordonnance ordonnance;

    @Column(name = "description")
    private String description;
    
    public DossierMedical() {
    	
    }

	public DossierMedical(Long idDossier, Patient patient, Ordonnance ordonnance, String description) {
		super();
		this.idDossier = idDossier;
		this.patient = patient;
		this.ordonnance = ordonnance;
		this.description = description;
	}

	public Long getIdDossier() {
		return idDossier;
	}

	public void setIdDossier(Long idDossier) {
		this.idDossier = idDossier;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Ordonnance getOrdonnance() {
		return ordonnance;
	}

	public void setOrdonnance(Ordonnance ordonnance) {
		this.ordonnance = ordonnance;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "DossierMedical [idDossier=" + idDossier + ", patient=" + patient + ", ordonnance=" + ordonnance
				+ ", description=" + description + "]";
	}
	

}

