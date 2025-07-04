"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import { db, type Product } from "@/lib/database"

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
      return
    }
    loadProducts()
  }, [])

  const loadProducts = () => {
    const allProducts = db.getAll<Product>("products")
    setProducts(allProducts)
    setLoading(false)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.artist.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      db.delete("products", id)
      loadProducts()
    }
  }

  const categories = ["all", "Portraits", "Landscapes", "Sacred art", "Wildlife", "Still life", "Children"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
              <p className="text-gray-600">Manage your art gallery collection</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/admin/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
            </div>
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
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  {products.length === 0
                    ? "Get started by creating your first product."
                    : "Try adjusting your search or filter criteria."}
                </p>
                <Button asChild>
                  <Link href="/admin/products/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Artist</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="relative w-12 h-12 mr-3">
                              <Image
                                src={product.images[0] || "/placeholder.svg?height=48&width=48"}
                                alt={product.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.title}</p>
                              <p className="text-sm text-gray-600">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{product.category}</td>
                        <td className="py-3 px-4">{product.artist}</td>
                        <td className="py-3 px-4">${product.price}</td>
                        <td className="py-3 px-4">
                          <Badge variant={product.status === "active" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/admin/products/edit/${product.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
