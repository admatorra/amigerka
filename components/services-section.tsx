import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Custom Orders */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64">
              <Image src="/placeholder.svg?height=300&width=500" alt="Custom Orders" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Custom Orders</h3>
              <p className="text-gray-600 mb-6">
                Create unique, personalized paintings that reflect your vision and style. Our talented artists work
                closely with you to bring your ideas to life.
              </p>
              <Button asChild>
                <Link href="/custom-orders">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Restoration */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-64">
              <Image src="/placeholder.svg?height=300&width=500" alt="Restoration" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Restoration</h3>
              <p className="text-gray-600 mb-6">
                Professional restoration services for paintings and icons. We carefully preserve and restore your
                precious artworks with expert techniques.
              </p>
              <Button asChild variant="outline">
                <Link href="/restoration">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
