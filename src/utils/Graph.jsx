// src/components/PieChart.jsx
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Text Reviews', 'Video Reviews'],
    datasets: [
      {
        label: 'Review Type',
        data: [data.text, data.video],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  return (
      <Pie data={chartData} />
  );
};

export default PieChart;
