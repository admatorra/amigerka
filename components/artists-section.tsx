import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const artists = [
  {
    name: "Zoriana Ilenko (Pavlyshyn)",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Curator of the artistic space of Armigera Art. Public figure, journalist, art critic, artist. She works in oil painting and icon painting with over 600 paintings created.",
    href: "/artists/zoriana-pavlyshyn",
  },
  {
    name: "Tetyana Andriyovych",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Modern Ukrainian artist working with various techniques including oil, ceramics and decorative arts. Born in Dolyna, Ivano-Frankivsk region.",
    href: "/artists/tetyana-andriyovych",
  },
]

export function ArtistsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Meet Our Artists</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {artists.map((artist) => (
            <div key={artist.name} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{artist.name}</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">{artist.description}</p>
              <Button asChild variant="outline">
                <Link href={artist.href}>View Works</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
