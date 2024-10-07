import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Ordonnances = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [medicament, setMedicament] = useState('');
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

  const handleInputChange = (e) => {
    setMedicament(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs avant l'envoi
    if (!medicament) {
      setError('Veuillez remplir le champ de médicament.');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:1500/api/ordonnance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient: { idPatient: id },
          medicament,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de l\'ordonnance');
      }

      setSuccessMessage('Ordonnance créée avec succès.');
      setMedicament('');
      setError(null);

      setTimeout(() => {
        setSuccessMessage('');
      }, 2000); 
    } catch (err) {
      console.error('Erreur lors de la création de l\'ordonnance:', err);
      setError(err.message);
    }
  };

  if (!patient) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Créer une ordonnance pour {patient.nom} {patient.prenom}</h2>
      {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}
      {successMessage && <div className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom du patient</label>
          <input
            type="text"
            value={patient.nom}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom du patient</label>
          <input
            type="text"
            value={patient.prenom}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Médicament</label>
          <textarea
            name="medicament"
            value={medicament}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Créer l`ordonnance
        </button>
      </form>
    </div>
  );
};

export default Ordonnances;
