"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Mail, Phone, User } from "lucide-react"

const sampleCustomers = [
  {
    id: 1,
    name: "Maria Kovalenko",
    email: "maria@example.com",
    phone: "+380 67 123 4567",
    orders: 3,
    totalSpent: 450,
    joinDate: "2024-12-01",
    lastOrder: "2025-01-15",
    status: "active",
    address: "вул. Шевченка 15, Київ, 01001",
  },
  {
    id: 2,
    name: "Petro Shevchenko",
    email: "petro@example.com",
    phone: "+380 67 234 5678",
    orders: 2,
    totalSpent: 300,
    joinDate: "2024-11-15",
    lastOrder: "2025-01-14",
    status: "active",
    address: "вул. Франка 22, Львів, 79000",
  },
  {
    id: 3,
    name: "Anna Lysenko",
    email: "anna@example.com",
    phone: "+380 67 345 6789",
    orders: 1,
    totalSpent: 900,
    joinDate: "2025-01-05",
    lastOrder: "2025-01-13",
    status: "active",
    address: "вул. Грушевського 8, Одеса, 65000",
  },
  {
    id: 4,
    name: "Oleksandr Bondar",
    email: "oleksandr@example.com",
    phone: "+380 67 456 7890",
    orders: 1,
    totalSpent: 200,
    joinDate: "2025-01-10",
    lastOrder: "2025-01-12",
    status: "active",
    address: "вул. Соборна 33, Дніпро, 49000",
  },
  {
    id: 5,
    name: "Oksana Petrenko",
    email: "oksana@example.com",
    phone: "+380 67 567 8901",
    orders: 2,
    totalSpent: 300,
    joinDate: "2024-10-20",
    lastOrder: "2025-01-11",
    status: "inactive",
    address: "вул. Миру 12, Харків, 61000",
  },
]

export default function CustomersManagement() {
  const [customers, setCustomers] = useState(sampleCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
    }
  }, [])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = filterStatus === "all" || customer.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 1000) return { tier: "VIP", color: "bg-purple-100 text-purple-800" }
    if (totalSpent >= 500) return { tier: "Gold", color: "bg-yellow-100 text-yellow-800" }
    if (totalSpent >= 200) return { tier: "Silver", color: "bg-gray-100 text-gray-800" }
    return { tier: "Bronze", color: "bg-orange-100 text-orange-800" }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customers Management</h1>
              <p className="text-gray-600">Manage your customer database</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {customers.filter((c) => c.status === "active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">VIP Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {customers.filter((c) => c.totalSpent >= 1000).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {Math.round(
                      customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                        customers.reduce((sum, c) => sum + c.orders, 0),
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search customers by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCustomers.map((customer) => {
                    const tier = getCustomerTier(customer.totalSpent)
                    return (
                      <div
                        key={customer.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedCustomer?.id === customer.id ? "border-blue-300 bg-blue-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{customer.name}</h3>
                            <p className="text-sm text-gray-600">{customer.email}</p>
                            <p className="text-xs text-gray-500">Joined: {customer.joinDate}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={tier.color}>{tier.tier}</Badge>
                            <p className="text-sm font-semibold mt-1">${customer.totalSpent}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600">
                            {customer.orders} order{customer.orders > 1 ? "s" : ""}
                          </p>
                          <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                            {customer.status}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCustomer ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-xl font-bold">{selectedCustomer.name.charAt(0)}</span>
                      </div>
                      <h3 className="font-semibold">{selectedCustomer.name}</h3>
                      <Badge className={getCustomerTier(selectedCustomer.totalSpent).color}>
                        {getCustomerTier(selectedCustomer.totalSpent).tier} Customer
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Address</h4>
                      <p className="text-sm text-gray-600">{selectedCustomer.address}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Order Statistics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Orders:</span>
                          <span className="font-medium">{selectedCustomer.orders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Spent:</span>
                          <span className="font-medium">${selectedCustomer.totalSpent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Order:</span>
                          <span className="font-medium">{selectedCustomer.lastOrder}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Avg. Order Value:</span>
                          <span className="font-medium">
                            ${Math.round(selectedCustomer.totalSpent / selectedCustomer.orders)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Order History
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Customer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">Select a customer to view details</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
