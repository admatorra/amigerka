"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

// Sample data based on PDF screenshots
const paintingsByCategory = {
  landscapes: [
    { id: 1, title: "Vorokhta", price: 200, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Winter", price: 350, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "On the outskirts of the village", price: 200, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "Summer Landscape", price: 3400, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Lviv", price: 600, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "Behind the fence", price: 300, image: "/placeholder.svg?height=400&width=400" },
    { id: 7, title: "Waterfall", price: 400, image: "/placeholder.svg?height=400&width=400" },
    { id: 8, title: "In the Village", price: 800, image: "/placeholder.svg?height=400&width=400" },
  ],
  "nude-style": [
    { id: 1, title: "Passion", price: 500, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Tenderness", price: 850, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Nude", price: 450, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "Through the Looking-Glass", price: 350, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Eromenos and Erastes", price: 1000, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "The lies of a forgotten passion", price: 300, image: "/placeholder.svg?height=400&width=400" },
  ],
  wildlife: [
    { id: 1, title: "Festive Deer", price: 200, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Wolf", price: 300, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Horse", price: 600, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "Reflections on the Future", price: 400, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Fish on the hook", price: 1200, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "The silence of the fish", price: 2000, image: "/placeholder.svg?height=400&width=400" },
    { id: 7, title: "Karl", price: 1000, image: "/placeholder.svg?height=400&width=400" },
    { id: 8, title: "Hollyhocks", price: 750, image: "/placeholder.svg?height=400&width=400" },
    { id: 9, title: "Sunflowers", price: 300, image: "/placeholder.svg?height=400&width=400" },
  ],
  "domestic-animals": [
    { id: 1, title: "Horse", price: 600, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Unbroken", price: 700, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Dog Patron", price: 1000, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "A girl with a rabbit", price: 1000, image: "/placeholder.svg?height=400&width=400" },
  ],
  "still-life": [
    { id: 1, title: "Roses", price: 300, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Decorative Sunflowers", price: 900, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Sadness", price: 150, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "Peonies", price: 150, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Dahlias", price: 1400, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "Still life with plums", price: 150, image: "/placeholder.svg?height=400&width=400" },
    { id: 7, title: "Little flowers", price: 150, image: "/placeholder.svg?height=400&width=400" },
    { id: 8, title: "A glass of cognac and love", price: 150, image: "/placeholder.svg?height=400&width=400" },
    { id: 9, title: "Violets", price: 300, image: "/placeholder.svg?height=400&width=400" },
    { id: 10, title: "Orchids", price: 150, image: "/placeholder.svg?height=400&width=400" },
  ],
  holidays: [
    { id: 1, title: "Festive Deer", price: 200, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Home Angel", price: 2200, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Little Angel", price: 1000, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "Inevitability", price: 300, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Christmas", price: 1250, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "Christmas", price: 350, image: "/placeholder.svg?height=400&width=400" },
    { id: 7, title: "The Holy Family", price: 2800, image: "/placeholder.svg?height=400&width=400" },
    { id: 8, title: "The Holy Family", price: 1350, image: "/placeholder.svg?height=400&width=400" },
    { id: 9, title: "Christmas", price: 150, image: "/placeholder.svg?height=400&width=400" },
  ],
  children: [
    { id: 1, title: "Loss", price: 400, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Angelina", price: 300, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Cupid", price: 5000, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "I love you", price: 700, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Mystery in the eyes", price: 350, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "Dog Patron", price: 1000, image: "/placeholder.svg?height=400&width=400" },
    { id: 7, title: "Arsenko", price: 5000, image: "/placeholder.svg?height=400&width=400" },
    { id: 8, title: "Ganusya", price: 600, image: "/placeholder.svg?height=400&width=400" },
    { id: 9, title: "A girl with a rabbit", price: 1000, image: "/placeholder.svg?height=400&width=400" },
  ],
  portraits: [
    { id: 1, title: "Parisian Lady", price: 200, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Girl", price: 300, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Happy Motherhood", price: 450, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "Wizard", price: 500, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Grandfather", price: 600, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "Everything Passes", price: 1200, image: "/placeholder.svg?height=400&width=400" },
    { id: 7, title: "Angelina", price: 300, image: "/placeholder.svg?height=400&width=400" },
    { id: 8, title: "Woman in lilac", price: 310, image: "/placeholder.svg?height=400&width=400" },
  ],
  icons: [{ id: 1, title: "John the Baptist", price: 850, image: "/placeholder.svg?height=400&width=400" }],
  "sacred-art": [
    { id: 1, title: "Home Angel", price: 2200, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Little Angel", price: 1000, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "John the Baptist", price: 1000, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "Jesus embraces the earth", price: 800, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Choice", price: 800, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "Holy Family", price: 1200, image: "/placeholder.svg?height=400&width=400" },
    { id: 7, title: "Madonna", price: 600, image: "/placeholder.svg?height=400&width=400" },
    { id: 8, title: "The Way of the Cross", price: 1200, image: "/placeholder.svg?height=400&width=400" },
  ],
  realism: [
    { id: 1, title: "Wizard", price: 500, image: "/placeholder.svg?height=400&width=400" },
    { id: 2, title: "Noah", price: 3000, image: "/placeholder.svg?height=400&width=400" },
    { id: 3, title: "Fishermen", price: 500, image: "/placeholder.svg?height=400&width=400" },
    { id: 4, title: "The Way of the Cross", price: 1200, image: "/placeholder.svg?height=400&width=400" },
    { id: 5, title: "Cupid", price: 900, image: "/placeholder.svg?height=400&width=400" },
    { id: 6, title: "Cupid", price: 5000, image: "/placeholder.svg?height=400&width=400" },
    { id: 7, title: "Archangel Michael", price: 2250, image: "/placeholder.svg?height=400&width=400" },
    { id: 8, title: "Samaritan Woman", price: 450, image: "/placeholder.svg?height=400&width=400" },
  ],
}

const categoryNames = {
  landscapes: "Landscapes",
  "nude-style": "Nude style",
  wildlife: "Wildlife",
  "domestic-animals": "Domestic animals",
  "still-life": "Occupational still Life",
  holidays: "For holidays",
  children: "Children",
  portraits: "Portraits",
  icons: "Icons",
  "sacred-art": "Sacred art",
  realism: "Realism",
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [sortBy, setSortBy] = useState("newest")
  const [productsPerPage, setProductsPerPage] = useState(20)

  const category = params.category as keyof typeof paintingsByCategory
  const paintings = paintingsByCategory[category] || []
  const categoryName = categoryNames[category] || "Gallery"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-2">Store homepage</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{categoryName}</h1>
        <div className="text-sm text-gray-500">Products</div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {paintings.map((painting) => (
          <div
            key={painting.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="relative aspect-square">
              <Image src={painting.image || "/placeholder.svg"} alt={painting.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{painting.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">${painting.price.toLocaleString()}</span>
                <Button size="sm">Buy</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Products per page: {productsPerPage}</div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">1</span>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  )
}
