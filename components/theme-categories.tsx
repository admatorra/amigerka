import Image from "next/image"
import Link from "next/link"

const themes = [
  { name: "Landscapes", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=landscapes" },
  { name: "Nude style", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=nude-style" },
  { name: "Wildlife", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=wildlife" },
  { name: "Domestic animals", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=domestic-animals" },
  { name: "Still life", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=still-life" },
  { name: "For holidays", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=holidays" },
  { name: "Portraits", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=portraits" },
  { name: "Icons", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=icons" },
  { name: "Realism", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=realism" },
  { name: "Children", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=children" },
  { name: "Sacred art", image: "/placeholder.svg?height=200&width=200", href: "/gallery?theme=sacred-art" },
  { name: "Gallery", image: "/placeholder.svg?height=200&width=200", href: "/gallery" },
]

export function ThemeCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Theme</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {themes.map((theme) => (
            <Link key={theme.name} href={theme.href} className="group text-center">
              <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
                <Image
                  src={theme.image || "/placeholder.svg"}
                  alt={theme.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                {theme.name}
              </h3>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-800 font-medium">Learn more</button>
        </div>
      </div>
    </section>
  )
}
