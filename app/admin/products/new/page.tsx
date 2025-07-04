"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { db, type Product } from "@/lib/database"

export default function NewProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    artist: "",
    dimensions: "",
    dimensionsInches: "", // Додати це поле
    materials: "",
    technique: "",
    status: "active",
  })
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create real product
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        images: images,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      db.create<Product>("products", productData)
      setSuccess(true)
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Error creating product. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prev) => [...prev, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">Product Created!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Your product has been successfully added to the gallery.</p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link href="/admin/products">View All Products</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/products/new">Add Another</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
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
              <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
              <p className="text-gray-600">Create a new painting listing</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/admin/products">Back to Products</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter painting title"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="150"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the painting..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Portraits">Portraits</option>
                    <option value="Landscapes">Landscapes</option>
                    <option value="Still life">Still life</option>
                    <option value="Sacred art">Sacred art</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Children">Children</option>
                    <option value="Icons">Icons</option>
                    <option value="Realism">Realism</option>
                    <option value="Nude style">Nude style</option>
                    <option value="For holidays">For holidays</option>
                    <option value="Domestic animals">Domestic animals</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="artist">Artist *</Label>
                  <select
                    id="artist"
                    name="artist"
                    required
                    value={formData.artist}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select artist</option>
                    <option value="Zoriana Pavlyshyn">Zoriana Pavlyshyn</option>
                    <option value="Tetyana Andriyovych">Tetyana Andriyovych</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dimensions">Dimensions (cm)</Label>
                  <Input
                    id="dimensions"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    placeholder="e.g., 50x70 cm"
                  />
                </div>
                <div>
                  <Label htmlFor="dimensionsInches">Dimensions (inches)</Label>
                  <Input
                    id="dimensionsInches"
                    name="dimensionsInches"
                    value={formData.dimensionsInches}
                    onChange={handleChange}
                    placeholder="e.g., 19.7x27.6 in"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="materials">Materials</Label>
                  <Input
                    id="materials"
                    name="materials"
                    value={formData.materials}
                    onChange={handleChange}
                    placeholder="e.g., Canvas, Oil"
                  />
                </div>
                <div>
                  <Label htmlFor="technique">Technique</Label>
                  <select
                    id="technique"
                    name="technique"
                    value={formData.technique}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select technique</option>
                    <option value="Oil">Oil</option>
                    <option value="Acrylic">Acrylic</option>
                    <option value="Tempera">Tempera</option>
                    <option value="Pastel">Pastel</option>
                    <option value="Ink">Ink</option>
                    <option value="Pencils">Pencils</option>
                    <option value="Charcoal">Charcoal</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="images">Upload Images (up to 5)</Label>
                  <div className="mt-2">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/products">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
