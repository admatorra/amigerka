import Image from "next/image"
import { Brush, Palette, Award, Globe } from "lucide-react"

export function WhyUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Exquisite Handcrafted Paintings at Exceptional Prices
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            We can elevate your brand to new heights by equipping you with exquisite paintings.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-lg font-semibold">
            Request a quote
          </button>
        </div>

        {/* The Value of Handcrafted Paintings */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">The Value of Handcrafted Paintings</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-6">
                Handcrafted paintings by artists possess unparalleled value that goes beyond simple decor. Here are some
                key aspects that make such paintings particularly valuable:
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Exclusivity and Uniqueness</h4>
                  <p className="text-gray-600">
                    Each painting created by an artist is a unique work of art with no duplicates. It's not just an art
                    piece but an exclusive element that adds individuality to any space.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Soulful Component</h4>
                  <p className="text-gray-600">
                    Art allows artists to express their thoughts, emotions, and worldview. Every brushstroke carries
                    deep meaning and a part of the artist's soul.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Artist painting"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Us</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brush className="h-8 w-8 text-gray-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Handmade</h4>
              <p className="text-gray-600 text-sm">
                Our artists work closely with each client to create bespoke, one-of-a-kind paintings that reflect their
                unique taste
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-gray-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Quality materials</h4>
              <p className="text-gray-600 text-sm">
                We want our artworks to last for generations, and therefore use only the highest quality materials.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-gray-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Oil on canvas</h4>
              <p className="text-gray-600 text-sm">Our oil paintings on canvas are now found in over 15 countries.</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Craftsmanship</h4>
              <p className="text-gray-600 text-sm">
                We combine traditional techniques and modern manufacturing technologies to create exquisite yet durable
                pieces.
              </p>
            </div>
          </div>
        </div>

        {/* What Handmade Means to Us */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">What Handmade Means to Us</h3>
        </div>

        {/* Instagram Section */}
        <div className="text-center mb-12">
          <h4 className="text-xl font-semibold mb-6 text-gray-900">Instagram @zorianna_pavlyshyn</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square relative">
                <Image
                  src={`/placeholder.svg?height=200&width=200`}
                  alt={`Instagram post ${i}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
