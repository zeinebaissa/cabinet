package in.cabinet.cabinet;


import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "patient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_patient")
    private Long idPatient;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "datedenaissance")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")

	private LocalDate datedenaissance;

    @Column(name = "sexe")
    private String sexe;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User id_user;
    
    
    public Patient() {
    	
    }
    
	public Patient(Long idPatient, String nom, String prenom, String telephone, LocalDate dateDeNaissance, String sexe,
			User user) {
		this.idPatient = idPatient;
		this.nom = nom;
		this.prenom = prenom;
		this.telephone = telephone;
		this.datedenaissance = dateDeNaissance;
		this.sexe = sexe;
		this.id_user = user;
	}

	public Long getIdPatient() {
		return idPatient;
	}

	public void setIdPatient(Long idPatient) {
		this.idPatient = idPatient;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public LocalDate getDateDeNaissance() {
		return datedenaissance;
	}

	public void setDateDeNaissance(LocalDate dateDeNaissance) {
		this.datedenaissance = dateDeNaissance;
	}

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public User getUser() {
		return id_user;
	}

	public void setUser(User user) {
		this.id_user = user;
	}

    
}


