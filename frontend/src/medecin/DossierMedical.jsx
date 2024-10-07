import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DossierMedical = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [ordonnances, setOrdonnances] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`http://localhost:1500/api/patient/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des informations du patient');
        }
        const data = await response.json();
        setPatient(data);
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors de la récupération des informations du patient:', err);
      }
    };

    const fetchOrdonnances = async () => {
      try {
        const response = await fetch(`http://localhost:1500/api/patient/${id}/ordonnances`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur lors de la récupération des ordonnances du patient');
        }
        const data = await response.json();
        setOrdonnances(data);
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors de la récupération des ordonnances du patient:', err);
      }
    };

    fetchPatient();
    fetchOrdonnances();
  }, [id]);

  if (!patient) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Dossier Médical de {patient.nom} {patient.prenom}</h2>
      {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">Informations du Patient</h3>
        <p><strong>Nom:</strong> {patient.nom}</p>
        <p><strong>Prénom:</strong> {patient.prenom}</p>
        <p><strong>Téléphone:</strong> {patient.telephone}</p>
        <p><strong>Sexe:</strong> {patient.sexe}</p>
        <p><strong>Date de Naissance:</strong> {patient.dateDeNaissance}</p>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <h3 className="text-xl font-semibold mb-2">Ordonnances</h3>
        {ordonnances.length > 0 ? (
          <ul>
            {ordonnances.map((ordonnance) => (
              <li key={ordonnance.id} className="mb-4 p-4 border rounded">
                <p><strong>Médicament:</strong> {ordonnance.medicament}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune ordonnance disponible.</p>
        )}
      </div>
    </div>
  );
};

export default DossierMedical;
