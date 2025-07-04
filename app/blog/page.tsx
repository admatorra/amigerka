"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, User, Tag } from "lucide-react"
import { db, type BlogPost } from "@/lib/database"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    const allPosts = db
      .getAll<BlogPost>("blog_posts")
      .filter((post) => post.status === "published")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setPosts(allPosts)
    setLoading(false)
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(posts.map((post) => post.category)))]

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
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Art & Inspiration Blog</h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover the world of art through our stories, tutorials, and insights from talented artists.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container mx-auto px-4 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              {posts.length === 0
                ? "No blog posts available yet. Check back soon!"
                : "Try adjusting your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={post.featuredImage || "/placeholder.svg?height=200&width=400"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">{post.category}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </div>

                  {post.tags.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest articles about art, techniques, and inspiration.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-1 bg-white text-gray-900" />
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
