"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import { cartManager, type CartItem } from "@/lib/cart"
import { toast } from "@/hooks/use-toast"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()

    const handleCartUpdate = () => {
      loadCart()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  const loadCart = () => {
    setCartItems(cartManager.getCart())
    setLoading(false)
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const success = cartManager.updateQuantity(itemId, newQuantity)
    if (!success) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      })
    }
  }

  const removeItem = (itemId: string) => {
    const success = cartManager.removeFromCart(itemId)
    if (success) {
      toast({
        title: "Removed",
        description: "Item removed from cart",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      })
    }
  }

  const clearCart = () => {
    const success = cartManager.clearCart()
    if (success) {
      toast({
        title: "Cart cleared",
        description: "All items removed from cart",
      })
    }
  }

  const total = cartManager.getCartTotal()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>

          {cartItems.length > 0 && (
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some beautiful artworks to get started!</p>
              <Link href="/gallery">
                <Button>Browse Gallery</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">by {item.artist}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-600">${item.price.toLocaleString()} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full mb-4" size="lg">
                    Proceed to Checkout
                  </Button>

                  <Link href="/gallery">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
