"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Users, ShoppingCart, FileText, Settings, TrendingUp, DollarSign } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/database"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalPosts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "admin") {
        window.location.href = "/auth/login"
      } else {
        setUser(parsedUser)
        // Load stats
        const dbStats = db.getStats()
        setStats(dbStats)
      }
    } else {
      window.location.href = "/auth/login"
    }
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toString(),
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Blog Posts",
      value: stats.totalPosts.toString(),
      icon: FileText,
      color: "bg-orange-500",
    },
  ]

  const quickActions = [
    {
      title: "Add New Product",
      href: "/admin/products/new",
      icon: Package,
      description: "Add a new painting to the gallery",
    },
    {
      title: "CRM System",
      href: "/admin/crm",
      icon: Users,
      description: "Manage customers and relationships",
    },
    {
      title: "Site Builder",
      href: "/admin/builder",
      icon: Settings,
      description: "Edit website layout and content",
    },
    {
      title: "Manage Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
      description: "View and manage customer orders",
    },
    {
      title: "Write Blog Post",
      href: "/admin/blog/new",
      icon: FileText,
      description: "Create a new blog article",
    },
    {
      title: "Database Management",
      href: "/admin/database",
      icon: Settings,
      description: "Manage database and integrations",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/">View Site</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("user")
                  window.location.href = "/auth/login"
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-green-500 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href} className="group">
                    <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center mb-2">
                        <action.icon className="h-5 w-5 text-blue-600 mr-2" />
                        <h4 className="font-medium group-hover:text-blue-600">{action.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
