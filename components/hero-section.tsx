"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroImages = [
  {
    src: "/ship_painting.jpg",
    alt: "Ship Painting",
    title: "Paintings That Set Your Mood",
  },
  {
    src: "/ship_painting.jpg",
    alt: "Ship Painting",
    title: "Paintings That Set Your Mood",
  },
  {
    src: "/ship_painting.jpg",
    alt: "Ship Painting",
    title: "Paintings That Set Your Mood",
  },
]

const paintings = [
  { name: "Girl with a Pitcher", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "River Boats", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Ballet dancer", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Lights", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Mountains", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Sadness", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Peonies", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Still life with plums", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Glynna Navaria", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Space", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "Little flowers", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
  { name: "A glass of cognac and love", price: 150.0, src: "/placeholder.svg?height=300&width=300" },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <>
      <section className="relative h-[600px] bg-gray-50 overflow-hidden">
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Paintings That Set Your Mood</h1>
            <p className="text-xl md:text-2xl mb-2">Each of our paintings is made by hand</p>
            <p className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">All for $150</p>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              View Collection
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Filters Section */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <label htmlFor="artist" className="block text-sm font-medium text-gray-700">
              Artist
            </label>
            <select
              id="artist"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option>All</option>
              <option>Artist 1</option>
              <option>Artist 2</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <div className="mt-1 space-y-2">
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-900">All</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-900">Nude style</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-900">Sacred art</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-900">Children</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-900">Icons</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-900">Portraits</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
              Price Range
            </label>
            <input type="range" id="priceRange" min="0" max="300" step="50" className="mt-1 w-full" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paintings.map((painting, index) => (
            <div key={index} className="border rounded-md p-4">
              <Image
                src={painting.src || "/placeholder.svg"}
                alt={painting.name}
                width={300}
                height={300}
                className="object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{painting.name}</h3>
              <p className="text-gray-600">${painting.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
