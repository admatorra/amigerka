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
import { db, type BlogPost } from "@/lib/database"

export default function NewBlogPost() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "Zoriana Pavlyshyn",
    status: "draft",
    tags: "",
  })
  const [featuredImage, setFeaturedImage] = useState<string>("")
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
      // Create real blog post
      const postData = {
        ...formData,
        featuredImage: featuredImage,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      db.create<BlogPost>("blog_posts", postData)
      setSuccess(true)
    } catch (error) {
      console.error("Error creating blog post:", error)
      alert("Error creating blog post. Please try again.")
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
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setFeaturedImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">Blog Post Created!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Your blog post has been successfully created.</p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link href="/admin/blog">View All Posts</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/blog/new">Write Another</Link>
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
              <h1 className="text-2xl font-bold text-gray-900">New Blog Post</h1>
              <p className="text-gray-600">Create a new article for your blog</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/admin/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog post title"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief description of the post..."
                  rows={3}
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
                    <option value="Workshop">Workshop</option>
                    <option value="Tips & Tricks">Tips & Tricks</option>
                    <option value="Education">Education</option>
                    <option value="News">News</option>
                    <option value="Artist Spotlight">Artist Spotlight</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <select
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
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
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="art, painting, tips, workshop"
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!featuredImage ? (
                  <div>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> featured image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={featuredImage || "/placeholder.svg"}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setFeaturedImage("")}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="content">Article Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  required
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog post content here..."
                  rows={15}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/blog">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
