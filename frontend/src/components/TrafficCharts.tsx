import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface TrafficData {
  country: string;
  city: string;
  location: string;
  timestamp: string;
  vehicleType: string;
  count: number;
  speed: number;
  direction: string;
}

export function TrafficCharts() {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/traffic')
      .then((res) => res.json())
      .then((data) => setTrafficData(data))
      .catch((error) => console.error('Error fetching traffic data:', error));
  }, []);

  // Prepare data for country-wise traffic
  const countryData = trafficData.reduce((acc, curr) => {
    acc[curr.country] = (acc[curr.country] || 0) + curr.count;
    return acc;
  }, {} as Record<string, number>);

  // Prepare data for vehicle type distribution
  const vehicleData = trafficData.reduce((acc, curr) => {
    acc[curr.vehicleType] = (acc[curr.vehicleType] || 0) + curr.count;
    return acc;
  }, {} as Record<string, number>);

  const countryChartData = {
    labels: Object.keys(countryData),
    datasets: [
      {
        label: 'Total Traffic by Country',
        data: Object.values(countryData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const vehicleChartData = {
    labels: Object.keys(vehicleData),
    datasets: [
      {
        label: 'Vehicle Type Distribution',
        data: Object.values(vehicleData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(199, 199, 199, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Country-wise Traffic</h2>
          <Bar data={countryChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Vehicle Type Distribution</h2>
          <Pie data={vehicleChartData} />
        </div>
      </div>
    </div>
  );
} 