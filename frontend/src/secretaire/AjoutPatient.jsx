import  { useState } from 'react';
import moment from 'moment';

const AjoutPatient = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [sexe, setSexe] = useState('');
  const [datedenaissance, setDateNaissance] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Conversion de la date au format dd-MM-yyyy
    const formattedDate = moment(datedenaissance).format('DD-MM-YYYY');

    const formData = {
      nom,
      prenom,
      telephone,
      sexe,
      datedenaissance: formattedDate
    };

    try {
      const response = await fetch('http://localhost:1500/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add patient');
      }

      setSuccess(true);
      setError(null);
      // Réinitialiser les champs du formulaire après soumission
      setNom('');
      setPrenom('');
      setTelephone('');
      setSexe('');
      setDateNaissance('');
    } catch (error) {
      setError('Une erreur s\'est produite lors de l\'ajout du patient');
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Ajouter un patient</h2>
      {error && <div className="bg-red-200 text-red-800 py-2 px-4 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-200 text-green-800 py-2 px-4 rounded mb-4">Patient ajouté avec succès</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block mb-1">Nom :</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="prenom" className="block mb-1">Prénom :</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="telephone" className="block mb-1">Téléphone :</label>
          <input
            type="tel"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="sexe" className="block mb-1">Sexe :</label>
          <select
            id="sexe"
            value={sexe}
            onChange={(e) => setSexe(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Sélectionner le sexe</option>
            <option value="homme">M</option>
            <option value="femme">F</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateNaissance" className="block mb-1">Date de naissance :</label>
          <input
            type="date" // Utilisation de l'élément input de type date
            id="dateNaissance"
            value={datedenaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Ajouter</button>
      </form>
    </div>
  );
};

export default AjoutPatient;
