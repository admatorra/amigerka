"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubmitted(true)
    setEmail("")
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to get the latest news and updates</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Sign up for our newsletter and receive the latest news on new arrivals and special offers right to your inbox!
        </p>

        {isSubmitted ? (
          <div className="text-green-400 text-lg font-semibold">Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-gray-900"
            />
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
