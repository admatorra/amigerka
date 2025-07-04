"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { db, type BlogPost } from "@/lib/database"

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const allPosts = db
      .getAll<BlogPost>("blog_posts")
      .filter((post) => post.status === "published")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3) // Показуємо тільки 3 останні пости

    setPosts(allPosts)
  }, [])

  if (posts.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Блог</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Останні новини та статті про мистецтво</p>
          </div>

          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Поки що немає опублікованих постів</p>
            <Link href="/blog">
              <Button variant="outline">Перейти до блогу</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Блог</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Останні новини та статті про мистецтво</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {post.image && (
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{new Date(post.createdAt).toLocaleDateString("uk-UA")}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  <Link href={`/blog/${post.id}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt || post.content.substring(0, 150) + "..."}
                </p>
                <Link href={`/blog/${post.id}`}>
                  <Button variant="outline" size="sm">
                    Читати далі
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button size="lg">Переглянути всі пости</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
