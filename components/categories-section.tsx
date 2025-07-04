import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Domestic animals",
    image: "/placeholder.svg?height=300&width=300",
    href: "/gallery?category=domestic-animals",
  },
  {
    name: "Still life",
    image: "/placeholder.svg?height=300&width=300",
    href: "/gallery?category=still-life",
  },
  {
    name: "For holidays",
    image: "/placeholder.svg?height=300&width=300",
    href: "/gallery?category=holidays",
  },
  {
    name: "Portraits",
    image: "/placeholder.svg?height=300&width=300",
    href: "/gallery?category=portraits",
  },
  {
    name: "Icons",
    image: "/placeholder.svg?height=300&width=300",
    href: "/gallery?category=icons",
  },
  {
    name: "Realism",
    image: "/placeholder.svg?height=300&width=300",
    href: "/gallery?category=realism",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Explore Our Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold text-center px-4">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
