"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CartButton } from "@/components/cart-button"
import { db, type Product } from "@/lib/database"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = [
  { value: "all", label: "Усі категорії" },
  { value: "landscapes", label: "Пейзажі" },
  { value: "portraits", label: "Портрети" },
  { value: "still-life", label: "Натюрморти" },
  { value: "sacred-art", label: "Сакральне мистецтво" },
  { value: "children", label: "Діти" },
  { value: "icons", label: "Ікони" },
  { value: "realism", label: "Реалізм" },
  { value: "nude-style", label: "Ню стиль" },
]

export default function GalleryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["all"])
  const [selectedArtist, setSelectedArtist] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  const loadProducts = useCallback(() => {
    const allProducts = db.getAll<Product>("products").filter((p) => p.status === "active")
    setProducts(allProducts)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category")
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl])
    }
  }, [searchParams])

  // Отримуємо унікальних художників
  const artists = ["all", ...new Set(products.map((p) => p.artist))].map((artist) => ({
    value: artist === "all" ? "all" : artist.toLowerCase().replace(/\s+/g, "-"),
    label: artist === "all" ? "Всі художники" : artist,
  }))

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "all") {
      setSelectedCategories(checked ? ["all"] : [])
    } else {
      setSelectedCategories((prev) => {
        const newCategories = prev.filter((c) => c !== "all")
        if (checked) {
          return [...newCategories, category]
        } else {
          const filtered = newCategories.filter((c) => c !== category)
          return filtered.length === 0 ? ["all"] : filtered
        }
      })
    }
  }

  const filteredProducts = products.filter((product) => {
    // Фільтр по категорії
    const categoryMatch =
      selectedCategories.includes("all") ||
      selectedCategories.some((cat) => product.category.toLowerCase().replace(/\s+/g, "-") === cat)

    // Фільтр по художнику
    const artistMatch = selectedArtist === "all" || product.artist.toLowerCase().replace(/\s+/g, "-") === selectedArtist

    // Фільтр по ціні
    const min = minPrice ? Number.parseFloat(minPrice) : 0
    const max = maxPrice ? Number.parseFloat(maxPrice) : Number.POSITIVE_INFINITY
    const priceMatch = product.price >= min && product.price <= max

    return categoryMatch && artistMatch && priceMatch
  })

  // Сортування
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "popular":
        return (b.views || 0) - (a.views || 0)
      case "newest":
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    }
  })

  // Підрахунок кількості товарів по категоріях
  const categoriesWithCount = categories.map((category) => ({
    ...category,
    count:
      category.value === "all"
        ? products.length
        : products.filter((p) => p.category.toLowerCase().replace(/\s+/g, "-") === category.value).length,
  }))

  // Знаходимо мін і макс ціни
  const prices = products.map((p) => p.price)
  const minProductPrice = prices.length > 0 ? Math.min(...prices) : 0
  const maxProductPrice = prices.length > 0 ? Math.max(...prices) : 1000

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Завантаження галереї...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Галерея</h1>
        <p className="text-xl text-gray-600 mb-2">Картини, що створюють настрій</p>
        <p className="text-lg text-gray-600">Кожна наша картина створена вручну</p>
        {products.length > 0 && <p className="text-2xl font-bold text-yellow-600 mt-2">Від ${minProductPrice}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
            {/* Artist Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Художник</h3>
              <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {artists.map((artist) => (
                    <SelectItem key={artist.value} value={artist.value}>
                      {artist.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Категорії</h3>
              <div className="space-y-2">
                {categoriesWithCount.map((category) => (
                  <label key={category.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.value)}
                      onChange={(e) => handleCategoryChange(category.value, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 flex-1">{category.label}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Ціновий діапазон</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder={`$${minProductPrice}`}
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder={`$${maxProductPrice}`}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Діапазон: ${minProductPrice} - ${maxProductPrice}
                </div>

                {(minPrice || maxPrice) && (
                  <button
                    onClick={() => {
                      setMinPrice("")
                      setMaxPrice("")
                    }}
                    className="w-full text-sm text-blue-600 hover:text-blue-800 py-1"
                  >
                    Очистити ціновий фільтр
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results and Sort */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              Показано {sortedProducts.length} з {products.length} картин
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Найновіші</SelectItem>
                <SelectItem value="popular">Найпопулярніші</SelectItem>
                <SelectItem value="price-low">Ціна: від низької</SelectItem>
                <SelectItem value="price-high">Ціна: від високої</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {products.length === 0 ? "Поки що немає картин" : "Картини не знайдено"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {products.length === 0
                    ? "Додайте картини через адмін панель, щоб побачити їх тут."
                    : "Спробуйте змінити фільтри для перегляду більшої кількості результатів."}
                </p>
                {products.length === 0 && (
                  <Link
                    href="/admin/products/new"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Додати першу картину
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={product.images[0] || "/placeholder.svg?height=300&width=300"}
                        alt={product.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{product.artist}</p>
                    {product.dimensions && <p className="text-xs text-gray-500 mb-2">{product.dimensions}</p>}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      <CartButton product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
