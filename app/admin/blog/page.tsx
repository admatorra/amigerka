"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { db, type BlogPost } from "@/lib/database"

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
      return
    }
    loadPosts()
  }, [])

  const loadPosts = () => {
    const allPosts = db.getAll<BlogPost>("blog_posts")
    setPosts(allPosts)
    setLoading(false)
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || post.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      db.delete("blog_posts", id)
      loadPosts()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
              <p className="text-gray-600">Manage your blog posts and articles</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Blog Post
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
                    placeholder="Search blog posts..."
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
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts ({filteredPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-600 mb-4">
                  {posts.length === 0
                    ? "Get started by creating your first blog post."
                    : "Try adjusting your search or filter criteria."}
                </p>
                <Button asChild>
                  <Link href="/admin/blog/new">
                    <Plus className="h-4 w-4 mr-2" />
                    New Blog Post
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {post.author}</span>
                          <span>•</span>
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/blog/edit/${post.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
