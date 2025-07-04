import { notFound } from "next/navigation"

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = await res.json()
    return product
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-auto rounded-lg" />
        </div>
        <div className="md:col-span-1">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium">${product.price}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{product.category}</span>
          </div>
          {product.rating && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Rating:</span>
              <span className="font-medium">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
          )}
          {product.dimensions && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Dimensions (cm):</span>
              <span className="font-medium">{product.dimensions}</span>
            </div>
          )}
          {product.dimensionsInches && (
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Dimensions (inches):</span>
              <span className="font-medium">{product.dimensionsInches}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
