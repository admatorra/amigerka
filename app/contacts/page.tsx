"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Mail, Phone, Instagram } from "lucide-react"

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setIsSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
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
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Contacts</h1>
          <p className="text-xl text-gray-600">Visit our shop! We will be happy to help you with any questions.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    Peakline St. 72 A<br />
                    Lviv, 79038, Ukraine
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">armigera.art@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+380 95 911 6065</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Instagram className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
                  <p className="text-gray-600">@zorianna_pavlyshyn</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map would be integrated here</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg border">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Write Us</h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-green-600 text-lg font-semibold mb-4">Thank you for your message!</div>
                  <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                  <Button onClick={() => setIsSubmitted(false)} className="mt-4" variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
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
                    <Label htmlFor="email">Email *</Label>
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
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1"
                      rows={6}
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Message
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
