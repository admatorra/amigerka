"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Database, Users, Package, FileText, Trash2, Download } from "lucide-react"
import { db } from "@/lib/database"

export default function DatabaseManagement() {
  const [user, setUser] = useState<any>(null)
  const [data, setData] = useState({
    users: [],
    products: [],
    posts: [],
    orders: [],
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
    } else {
      setUser(JSON.parse(userData))
      loadData()
    }
  }, [])

  const loadData = () => {
    setData({
      users: db.getAll("users"),
      products: db.getAll("products"),
      posts: db.getAll("posts"),
      orders: db.getAll("orders"),
    })
  }

  const clearTable = (table: string) => {
    if (confirm(`Are you sure you want to clear all ${table}?`)) {
      db.clear(table)
      loadData()
    }
  }

  const exportData = () => {
    const allData = {
      users: data.users,
      products: data.products,
      posts: data.posts,
      orders: data.orders,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `armigera-backup-${new Date().toISOString().split("T")[0]}.json`
    a.click()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Database Management</h1>
              <p className="text-gray-600">Manage your website data and integrations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{data.users.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-3xl font-bold text-gray-900">{data.products.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Posts</p>
                      <p className="text-3xl font-bold text-gray-900">{data.posts.length}</p>
                    </div>
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900">{data.orders.length}</p>
                    </div>
                    <Database className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Users Database</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => clearTable("users")}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.users.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No users found</p>
                  ) : (
                    data.users.map((user: any) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Products Database</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => clearTable("products")}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.products.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No products found</p>
                  ) : (
                    data.products.map((product: any) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{product.title}</p>
                          <p className="text-sm text-gray-600">{product.artist}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${product.price}</p>
                          <Badge variant={product.status === "active" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Blog Posts Database</CardTitle>
                <Button variant="destructive" size="sm" onClick={() => clearTable("posts")}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.posts.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No posts found</p>
                  ) : (
                    data.posts.map((post: any) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-gray-600">By {post.author}</p>
                        </div>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Third-party Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Email Service</h4>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Connect email service for notifications</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Payment Gateway</h4>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Setup payment processing</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Analytics</h4>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Track website performance</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Social Media</h4>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Connect social media accounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
