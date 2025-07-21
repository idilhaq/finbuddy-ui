import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "@/app/dashboard/data.json"
import { useEffect, useState } from "react"
import { getUserInfo } from "@/services/userService"
import { getDashboardSummary } from "@/services/dashboardService"
import { getUserExpenses } from "@/services/expenseService"

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

export type UserData = {
  id: string
  name: string
  email: string
  role: string
  avatar: string
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
  const [userData, setUserData] = useState<UserData>()
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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" userData={userData} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard