"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Edit, Package, Truck, CheckCircle } from "lucide-react"

const sampleOrders = [
  {
    id: 1001,
    customer: {
      name: "Maria Kovalenko",
      email: "maria@example.com",
      phone: "+380 67 123 4567",
    },
    items: [{ name: "Girl with a Pitcher", price: 150, quantity: 1 }],
    total: 150,
    status: "completed",
    paymentStatus: "paid",
    shippingAddress: "вул. Шевченка 15, Київ, 01001",
    date: "2025-01-15",
    trackingNumber: "UA123456789",
  },
  {
    id: 1002,
    customer: {
      name: "Petro Shevchenko",
      email: "petro@example.com",
      phone: "+380 67 234 5678",
    },
    items: [
      { name: "River Boats", price: 150, quantity: 1 },
      { name: "Peonies", price: 150, quantity: 1 },
    ],
    total: 300,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: "вул. Франка 22, Львів, 79000",
    date: "2025-01-14",
    trackingNumber: null,
  },
  {
    id: 1003,
    customer: {
      name: "Anna Lysenko",
      email: "anna@example.com",
      phone: "+380 67 345 6789",
    },
    items: [{ name: "Archangel Michael", price: 900, quantity: 1 }],
    total: 900,
    status: "completed",
    paymentStatus: "paid",
    shippingAddress: "вул. Грушевського 8, Одеса, 65000",
    date: "2025-01-13",
    trackingNumber: "UA987654321",
  },
  {
    id: 1004,
    customer: {
      name: "Oleksandr Bondar",
      email: "oleksandr@example.com",
      phone: "+380 67 456 7890",
    },
    items: [{ name: "Festive Deer", price: 200, quantity: 1 }],
    total: 200,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: "вул. Соборна 33, Дніпро, 49000",
    date: "2025-01-12",
    trackingNumber: "UA456789123",
  },
  {
    id: 1005,
    customer: {
      name: "Oksana Petrenko",
      email: "oksana@example.com",
      phone: "+380 67 567 8901",
    },
    items: [{ name: "Sadness", price: 150, quantity: 1 }],
    total: 150,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: "вул. Миру 12, Харків, 61000",
    date: "2025-01-11",
    trackingNumber: null,
  },
]

export default function OrdersManagement() {
  const [orders, setOrders] = useState(sampleOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
    }
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />
      case "processing":
        return <Edit className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600">Manage customer orders and shipments</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders by customer name, email, or order ID..."
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
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Orders ({filteredOrders.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id ? "border-blue-300 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.customer.name}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <Badge className={`${getStatusColor(order.status)} text-xs`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""}
                        </p>
                        <div className="flex space-x-2">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs px-2 py-1 border rounded"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedOrder ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Customer Information</h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <strong>Name:</strong> {selectedOrder.customer.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {selectedOrder.customer.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {selectedOrder.customer.phone}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Shipping Address</h4>
                      <p className="text-sm">{selectedOrder.shippingAddress}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>${item.price * item.quantity}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${selectedOrder.total}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Order Status</h4>
                      <Badge className={`${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1 capitalize">{selectedOrder.status}</span>
                      </Badge>
                    </div>

                    {selectedOrder.trackingNumber && (
                      <div>
                        <h4 className="font-semibold mb-2">Tracking Number</h4>
                        <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedOrder.trackingNumber}</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Details
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        Send Email to Customer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">Select an order to view details</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
