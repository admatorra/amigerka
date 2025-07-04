"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, Tag, ArrowLeft, Share2, Heart } from "lucide-react"
import { db, type BlogPost } from "@/lib/database"

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadPost(params.id as string)
    }
  }, [params.id])

  const loadPost = (postId: string) => {
    const foundPost = db.getById<BlogPost>("blog_posts", postId)

    if (foundPost && foundPost.status === "published") {
      setPost(foundPost)

      // Load related posts
      const allPosts = db
        .getAll<BlogPost>("blog_posts")
        .filter((p) => p.status === "published" && p.id !== postId)
        .filter((p) => p.category === foundPost.category || p.tags.some((tag) => foundPost.tags.includes(tag)))
        .slice(0, 3)

      setRelatedPosts(allPosts)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">{post.category}</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

            {post.excerpt && <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>}

            {/* Social Actions */}
            <div className="flex items-center space-x-4 mt-6 pt-6 border-t">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="whitespace-pre-wrap leading-relaxed text-gray-700">{post.content}</div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-12 pb-8 border-b">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-32">
                      <Image
                        src={relatedPost.featuredImage || "/placeholder.svg?height=150&width=300"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={`/blog/${relatedPost.id}`}>Read More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
