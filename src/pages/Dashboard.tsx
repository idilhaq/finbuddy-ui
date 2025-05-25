import { useEffect, useState } from 'react';
import { getDashboardSummary } from '../services/dashboardService';

type DashboardSummary = {
  total_expenses: number;
  needs: number;
  wants: number;
  savings: number;
  total_savings: number;
  budget_plan: {
    needs: number;
    wants: number;
    savings: number;
  };
};

function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const userId = '2e661703-d334-48bd-8976-b7e17e8931f3';
  const month = '2025-05';

  useEffect(() => {
    getDashboardSummary(userId, month).then((data) => setSummary(data as DashboardSummary));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      {summary ? (
        <div>
          <p className="text-lg">Monthly Spending: {summary.total_expenses}</p>
          <p className="text-lg">Savings Progress: {summary.savings}%</p>
        </div>
      ) : (
        <p>Loading summary...</p>
      )}
    </div>
  );
}

export default Dashboard;