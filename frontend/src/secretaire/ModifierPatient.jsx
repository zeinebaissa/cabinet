import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    sexe: '',
    dateDeNaissance: '' // Ensure consistency in key naming
  });
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
        // Ensure consistency in key naming
        setFormData({
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          sexe: data.sexe,
          dateDeNaissance: data.dateDeNaissance
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching patient:', err);
      }
    };

    fetchPatient();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:1500/api/patient/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du patient');
      }
      setSuccessMessage('Patient mis à jour avec succès.');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/secretaire/dashboard/liste-patients');
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de la mise à jour du patient:', err);
    }
  };

  if (!patient) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Modifier Patient</h2>
      {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}
      {successMessage && <div className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sexe</label>
          <select
            name="sexe"
            value={formData.sexe}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Sélectionner le sexe</option>
            <option value="Masculin">Masculin</option>
            <option value="Féminin">Féminin</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
          <input
            type="date"
            name="dateDeNaissance"
            value={formData.dateDeNaissance}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default ModifierPatient;
