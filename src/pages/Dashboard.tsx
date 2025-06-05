import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getDashboardSummary } from "@/services/dashboardService"
import { getUserInfo } from '@/services/userService'
import { getUserExpenses } from '@/services/expenseService'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'

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

type UserExpenses = {
  id: string
  category: string
  amount: number
  note: string
  date: string
  created_at: string
  updated_at: string
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null)
  const [dashboardLoading, setLoading] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [userExpenses, setUserExpenses] = useState<UserExpenses[] | null>(null)
  const [userDataLoading, setUserDataLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      setUserDataLoading(true)
      setError(null)
      const result = await getUserInfo()
      if (result.success) {
        setUserData(result.data)
      } else {
        setError(result.error)
      }
      setUserDataLoading(false)
    }
    fetchUserInfo()
  }, [])

  const month = '2025-06';

  useEffect(() => {
    if (!userData?.id) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      const result = await getDashboardSummary(userData?.id, month)
      if (result.success) {
        setDashboardData(result.data)
      } else {
        setError(result.error)
      }
      setLoading(false)
    }

    fetchData()
  }, [userData, month])

  useEffect(() => {
    const fetchUserExpenses = async () => {
      const result = await getUserExpenses()
      if (result.success) {
        setUserExpenses(result.data)
      } else {
        setError(result.error)
      }
    }
    fetchUserExpenses()
  }, [userData])

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
      <div className="my-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => window.location.href = '/expenses'}
        >
          Add Expense
        </button>
      </div>
      {userExpenses && (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.category}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.created_at}</TableCell>
                <TableCell className="text-right">{expense.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{userExpenses.reduce((sum, expense) => sum + expense.amount, 0)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  )
}

export default Dashboard
