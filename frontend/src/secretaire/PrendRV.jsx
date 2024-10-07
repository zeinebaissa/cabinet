import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PrendRV = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [dateRendezVous, setDateRendezVous] = useState('');
  const [heure, setHeureRendezVous] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:1500/api/patient/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations du patient');
        }
        const data = await response.json();
        setPatient(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors de la récupération des informations du patient:', err);
      }
    };

    fetchPatient();
  }, [id]);

  const checkRendezVousConflict = async (date, heure) => {
    try {
      const response = await fetch('http://localhost:1500/api/rendezvous');
      if (!response.ok) {
        throw new Error('Erreur lors de la vérification des rendez-vous');
      }
      const rendezVousList = await response.json();

      const newRendezVousDateTime = new Date(`${date}T${heure}`);
      
      return rendezVousList.some(rv => {
        const existingRendezVousDateTime = new Date(`${rv.dateRendezVous}T${rv.heure}`);
        return existingRendezVousDateTime.getTime() === newRendezVousDateTime.getTime();
      });
    } catch (err) {
      console.error('Erreur lors de la vérification des rendez-vous:', err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dateRendezVous || !heure) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    const conflictExists = await checkRendezVousConflict(dateRendezVous, heure);
    if (conflictExists) {
      setError('Un rendez-vous existe déjà à cette date et heure.');
      return;
    }

    try {
      const response = await fetch('http://localhost:1500/api/rendezvous', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient: { idPatient: id },
          dateRendezVous,
          heure,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la prise de rendez-vous');
      }

      setSuccessMessage('Rendez-vous pris avec succès.');
      setDateRendezVous('');
      setHeureRendezVous('');
      setError(null);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Erreur lors de la prise de rendez-vous:', err);
      setError(err.message);
    }
  };

  if (!patient) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Prendre un rendez-vous pour {patient.nom} {patient.prenom}</h2>
      {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}
      {successMessage && <div className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Date de rendez-vous</label>
          <input
            type="date"
            value={dateRendezVous}
            onChange={(e) => setDateRendezVous(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Heure de rendez-vous</label>
          <input
            type="time"
            value={heure}
            onChange={(e) => setHeureRendezVous(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Prendre rendez-vous
        </button>
      </form>
    </div>
  );
};

export default PrendRV;
