
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DashboardM = () => {
  const barData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
    datasets: [
      {
        label: 'Nombre de Patients',
        data: [30, 45, 60, 50, 70, 90, 100],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const pieData = {
    labels: ['Hommes', 'Femmes'],
    datasets: [
      {
        label: 'Répartition par sexe',
        data: [60, 40],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const lineData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
    datasets: [
      {
        label: 'Patients Enregistrés',
        data: [10, 20, 30, 25, 40, 35, 50],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Tableau de bord de statistiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Nombre de Patients (Bar)</h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Répartition par sexe (Pie)</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Patients Enregistrés (Line)</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardM;
