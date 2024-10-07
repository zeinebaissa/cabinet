import { useState, useEffect } from 'react';


const ListePatients = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:1500/api/patient');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des patients');
        }
        const data = await response.json();
        setPatients(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, [successMessage]); // Effect will re-run when successMessage changes

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce patient ?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:1500/api/patient/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du patient');
      }
      setPatients(patients.filter(patient => patient.idPatient !== id));
      setError(null);
      setSuccessMessage('Patient supprimé avec succès.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear success message after 3 seconds
    } catch (err) {
      console.error('Erreur lors de la suppression du patient:', err);
      setError(err.message);
    }
  };

  const handleModify = (id) => {
    console.log('Modifier patient', id);
    window.location.href = `/secretaire/dashboard/modifierInfoPatient/${id}`;
    
  };

  const handleRendezVous = (id) => {
    console.log('Prendre rendez-vous pour patient', id);
    location.href = `/secretaire/dashboard/prend-RV/${id}`;
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Liste des patients</h2>
      {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}
      {successMessage && <div className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{successMessage}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Prénom</th>
            <th className="py-2 px-4 border-b">Téléphone</th>
            <th className="py-2 px-4 border-b">Sexe</th>
            <th className="py-2 px-4 border-b">Date de naissance</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => {
            return (
              <tr key={patient.idPatient}>
                <td className="py-2 px-4 border-b">{patient.nom}</td>
                <td className="py-2 px-4 border-b">{patient.prenom}</td>
                <td className="py-2 px-4 border-b">{patient.telephone}</td>
                <td className="py-2 px-4 border-b">{patient.sexe}</td>
                <td className="py-2 px-4 border-b">{patient.datedenaissance}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    onClick={() => handleModify(patient.idPatient)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(patient.idPatient)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={() => handleRendezVous(patient.idPatient)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Prendre RDV
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListePatients;
