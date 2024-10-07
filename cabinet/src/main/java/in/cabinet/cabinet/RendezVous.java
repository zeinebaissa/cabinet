package in.cabinet.cabinet;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "rendez_vous")
@JsonIgnoreProperties(ignoreUnknown = true)
public class RendezVous {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_rendezvous")
	private Long idRendezVous;

	@ManyToOne
	@JoinColumn(name = "id_patient")
	private Patient patient;

	@Column(name = "date_rendezvous")
	private LocalDate dateRendezVous;

	@Column(name = "heure")
	private LocalTime heure;

	// Constructors
	public RendezVous() {}

	public RendezVous(Long idRendezVous, Patient patient, LocalDate dateRendezVous, LocalTime heure) {
		this.idRendezVous = idRendezVous;
		this.patient = patient;
		this.dateRendezVous = dateRendezVous;
		this.heure = heure;
	}

	// Getters and Setters
	public Long getIdRendezVous() {
		return idRendezVous;
	}

	public void setIdRendezVous(Long idRendezVous) {
		this.idRendezVous = idRendezVous;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public LocalDate getDateRendezVous() {
		return dateRendezVous;
	}

	public void setDateRendezVous(LocalDate dateRendezVous) {
		this.dateRendezVous = dateRendezVous;
	}

	public LocalTime getHeure() {
		return heure;
	}

	public void setHeure(LocalTime heure) {
		this.heure = heure;
	}
}
