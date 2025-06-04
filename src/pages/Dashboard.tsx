import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getDashboardSummary } from "@/services/dashboardService"
import { getCurrentUser, getUserInfo } from '@/services/userService'

interface BudgetPlan {
  needs: number
  savings: number
  wants: number
}

type DashboardResponse = {
  budget_plan: BudgetPlan
  needs: number
  savings: number
  total_expenses: number
  total_savings: number
  wants: number
}

type UserData = {
  id: string
  name: string
  email: string
  role: string
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null)
  const [dashboardLoading, setLoading] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [userDataLoading, setUserDataLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const [userId, setUserId] = useState<string | null>('')

  useEffect(() => {
    const fetchUserId = async () => {
      const result = await getCurrentUser()
      if (result.success) {
        setUserId(result.data)
      } else {
        setError(result.error)
      }
    }
    fetchUserId()
  }, [])
  
  const month = '2025-05';

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      const result = await getDashboardSummary(userId, month)
      if (result.success) {
        setDashboardData(result.data)
      } else {
        setError(result.error)
      }
      setLoading(false)
    }

    const fetchUserData = async () => {
      setUserDataLoading(true)
      setError(null)
      const result = await getUserInfo(userId)
      if (result.success) {
        setUserData(result.data)
      } else {
        setError(result.error)
      }
      setUserDataLoading(false)
    }

    fetchData()
    fetchUserData()
  }, [userId, month])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">FinBuddy Dashboard</h2>
      <h3 className="text-2xl font-bold mb-4">Welcome, {userData?.name}</h3>
      {dashboardLoading ? (
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
        dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Needs: {dashboardData.needs}</p>
                <p>Wants: {dashboardData.wants}</p>
                <p>Savings: {dashboardData.savings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Needs Spent: {dashboardData.needs}</p>
                <p>Wants Spent: {dashboardData.wants}</p>
                <p>Savings Added: {dashboardData.savings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Totals</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total Expenses: {dashboardData.total_expenses}</p>
                <p>Total Savings: {dashboardData.total_savings}</p>
              </CardContent>
            </Card>
          </div>
        )
      )}
    </div>
  )
}

export default Dashboard
