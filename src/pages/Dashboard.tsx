import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getDashboardSummary } from "@/services/dashboardService"

interface BudgetPlan {
  needs: number
  savings: number
  wants: number
}

interface DashboardResponse {
  budget_plan: BudgetPlan
  needs: number
  savings: number
  total_expenses: number
  total_savings: number
  wants: number
}

function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const userId = '2e661703-d334-48bd-8976-b7e17e8931f3';
  const month = '2025-05';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      const result = await getDashboardSummary(userId, month)
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error)
      }
      setLoading(false)
    }

    fetchData()
  }, [userId, month])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">FinBuddy Dashboard</h2>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-lg bg-white shadow">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ) : (
        data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Needs: {data.needs}</p>
                <p>Wants: {data.wants}</p>
                <p>Savings: {data.savings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Needs Spent: {data.needs}</p>
                <p>Wants Spent: {data.wants}</p>
                <p>Savings Added: {data.savings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Totals</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total Expenses: {data.total_expenses}</p>
                <p>Total Savings: {data.total_savings}</p>
              </CardContent>
            </Card>
          </div>
        )
      )}
    </div>
  )
}

export default Dashboard
