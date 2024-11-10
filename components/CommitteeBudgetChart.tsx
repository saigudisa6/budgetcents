import { getCommitteeBudgets } from '@/pages/api/fetch';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';

interface CommitteeBudget {
  name: string;
  budget: number;
  activities: {name: string, cost: number}[];
}
Chart.register(ArcElement, Tooltip, Legend);
const CommitteeBudgetChart = () => {
  const [budgets, setBudgets] = useState<CommitteeBudget[]>([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await getCommitteeBudgets();
        console.log(response)

        // const data = await response.json();
        setBudgets(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBudgets();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const index = tooltipItem.dataIndex; // Get the index of the hovered item
            const budget = budgets[index].budget;
            const actual = budgets[index].activities.reduce((sum, activity) => sum + activity.cost, 0); // Calculate actual spending
            const difference = actual - budget; // Calculate difference
            const status = difference > 0 ? `Over budget by $${difference}` : `Saved $${Math.abs(difference)}`; // Determine status

            return [
              `${tooltipItem.label} budget: $${budget}`,
              status,
            ]; // Customize tooltip content
          },
        },
      },
    },
  };

  // Prepare data for the pie chart
  const chartData = {
    labels: budgets.map(committee => committee.name),
    datasets: [
      {
        data: budgets.map(committee => committee.budget),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Add more colors as needed
      },
    ],
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {/* <h2>Committee Budgets</h2> */}
      <div style={{ width: '250px', height: '250px' }}><Pie data={chartData} width={100} height={100} options={options} /></div>
      
    </div>
  );
};

export default CommitteeBudgetChart;