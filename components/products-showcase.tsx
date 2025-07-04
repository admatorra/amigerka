"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db, type Product } from "@/lib/database"
import { CartButton } from "@/components/cart-button"

export function ProductsShowcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [displayCount, setDisplayCount] = useState(12)

  useEffect(() => {
    const allProducts = db.getAll<Product>("products").filter((p) => p.status === "active")
    setProducts(allProducts)
  }, [])

  const displayedProducts = products.slice(0, displayCount)

  const loadMore = () => {
    setDisplayCount((prev) => prev + 12)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Продукція</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ми малюємо всі види картин, щоб створити атмосферу у вашому житловому середовищі. Ось деякі з них:
          </p>
        </div>

        {products.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Живопис</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
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
                      <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {product.title}
                      </h4>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{product.artist}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
                      <div className="flex gap-2">
                        <Link href={`/product/${product.id}`}>
                          <Button size="sm" variant="outline">
                            Переглянути
                          </Button>
                        </Link>
                        <CartButton product={product} size="sm">
                          Купити
                        </CartButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {displayCount < products.length && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" onClick={loadMore}>
                  Завантажити ще ({products.length - displayCount} залишилось)
                </Button>
              </div>
            )}
          </>
        )}

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Поки що немає доступних продуктів.</p>
            <p className="text-gray-500 text-sm mt-2">Додайте продукти через адмін панель, щоб побачити їх тут.</p>
          </div>
        )}
      </div>
    </section>
  )
}
