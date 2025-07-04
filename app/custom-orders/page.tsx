"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function CustomOrdersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
    setFormData({ name: "", email: "", description: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Custom Orders</h1>
          <p className="text-xl text-gray-600">Create unique, personalized paintings that reflect your vision</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Information */}
          <div>
            <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Custom painting process"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">Why Paintings Are the Best Gift?</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Unique</h3>
                <p className="text-gray-600">Each painting is one-of-a-kind, reflecting the recipient's personality.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Emotional Connection</h3>
                <p className="text-gray-600">Paintings evoke deep emotions and memories.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Longevity</h3>
                <p className="text-gray-600">Unlike many gifts, paintings last a lifetime.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Aesthetic Value</h3>
                <p className="text-gray-600">They enhance the beauty of any space.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Investment</h3>
                <p className="text-gray-600">Quality paintings can appreciate in value over time.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personalized</h3>
                <p className="text-gray-600">Custom paintings show attention to detail and thoughtfulness.</p>
              </div>
            </div>

            <p className="mt-6 text-gray-600 font-medium">
              Paintings make thoughtful, lasting, and beautiful gifts that leave a lasting impression.
            </p>
          </div>

          {/* Right Column - Form */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Request a Custom Painting</h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-green-600 text-lg font-semibold mb-4">Thank you for your request!</div>
                  <p className="text-gray-600">We'll contact you within 24 hours to discuss your custom painting.</p>
                  <Button onClick={() => setIsSubmitted(false)} className="mt-4" variant="outline">
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Describe Your Idea *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1"
                      rows={6}
                      placeholder="Please describe your vision, preferred style, colors, size, and any specific details you'd like to include in your custom painting..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Request
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
