import Image from "next/image"

export default function OurStoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Our Story</h1>

        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <p className="text-xl text-gray-600 mb-6">
              At Armigera Art, we make stylish paintings. All our products aim to bring more beauty and aesthetics to
              your life. We take an individual approach to each of our unique designs. We use only the highest quality
              materials so that our products will serve you for many years.
            </p>

            <p className="text-lg text-gray-600 mb-8">
              We create a wide range of paintings of the highest quality. We stand out from the rest thanks to our
              unique approach, designed to meet the needs of modern customers. Buy our products and add art to your
              life.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>

          <p className="mb-6">
            Armigera Art is a self-organized space for artists of various directions, which created for artists the
            possibility of a dialogical platform for contemporary art.
          </p>

          <p className="mb-6">
            The Armigera Art Gallery invited contemporary artists to a charity exhibition on March 26, 2023 as part of
            the All-Ukrainian Charity Strongman and Bench press competitions project in Lviv in "Stargorod".
          </p>

          <p className="mb-6">
            The exhibition platform presented 50 works by talented artists from many corners of Ukraine. In particular,
            Lviv, Kyiv, Kharkiv, Kropyvnytskyi and others. The exhibition is aimed at creating a dialogical space
            between the artist and the viewer, as well as charity for the soldiers of the Armed Forces of Ukraine, and
            its culmination is an auction.
          </p>

          <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=300&width=800" alt="Gallery exhibition" fill className="object-cover" />
          </div>

          <h3 className="text-2xl font-bold mb-4 text-gray-900">Master classes from Armigera Art</h3>

          <p className="mb-6">
            More than 500 hours of artistic skill were received by children and adults during three months
            (July-August-September) at master classes from Armigera Art. The youngest participant was 4 years old and
            the oldest participant was 70+. The organized space as a platform for modern art and recreation gave
            children and adults the opportunity to self-improve, create their own masterpieces, simply have fun with a
            brush in their hands, and most importantly, distract themselves from bad thoughts related to the present.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-gray-900">A new gallery opened in Lviv</h3>

          <p className="mb-6">
            Zoryana Pavlyshyn, a member of the Union of Artists of Ukraine, created the Armigera Art gallery. The old
            workshop became too small to meet all the needs, and most importantly, not only for creating new paintings
            and icons, but also for restoration work, as well as their decoration. So, the idea of purchasing additional
            equipment and raw materials allowed us to expand our capabilities.
          </p>
        </div>
      </div>
    </div>
  )
}
