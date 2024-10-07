import  { useState, useEffect } from 'react';

const ListeRV = () => {
  const [rendezvous, setRendezvous] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRendezvous = async () => {
      try {
        const response = await fetch('http://localhost:1500/api/rendezvous');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des rendez-vous');
        }
        const data = await response.json();
        setRendezvous(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching rendez-vous:', err);
      }
    };

    fetchRendezvous();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:1500/api/rendezvous/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du rendez-vous');
      }
      setRendezvous(rendezvous.filter(rv => rv.idRendezVous !== id));
    } catch (err) {
      console.error('Erreur lors de la suppression du rendez-vous:', err);
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Liste des rendez-vous</h2>
      {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Patient</th>
            <th className="py-2 px-4 border-b">Téléphone</th>
            <th className="py-2 px-4 border-b">Date de rendez-vous</th>
            <th className="py-2 px-4 border-b">Heure de rendez-vous</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rendezvous.map((rv) => {
            const patientName = rv.patient ? `${rv.patient.nom} ${rv.patient.prenom}` : 'Patient inconnu';
            const patientPhone = rv.patient ? rv.patient.telephone : 'Non disponible';
            return (
              <tr key={rv.idRendezVous}>
                <td className="py-2 px-4 border-b">{patientName}</td>
                <td className="py-2 px-4 border-b">{patientPhone}</td>
                <td className="py-2 px-4 border-b">{rv.dateRendezVous}</td>
                <td className="py-2 px-4 border-b">{rv.heure}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(rv.idRendezVous)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Supprimer
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

export default ListeRV;
