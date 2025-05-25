import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarGraph = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.space), // space titles
    datasets: [
      {
        label: 'Total Testimonials',
        data: data.map((item) => item.testimonialcount), // testimonial count
        backgroundColor: '#36A2EB',
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#fff',
        },
        grid: {
          color: '#444',
        },
      },
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: '#444',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Space vs Testimonial Count</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
