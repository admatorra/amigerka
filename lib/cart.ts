"use client"

export interface CartItem {
  id: string
  productId: string
  title: string
  artist: string
  price: number
  image: string
  quantity: number
  addedAt: string
}

class CartManager {
  private storageKey = "armigera_cart"

  getCart(): CartItem[] {
    if (typeof window === "undefined") return []
    const cart = localStorage.getItem(this.storageKey)
    return cart ? JSON.parse(cart) : []
  }

  addToCart(product: {
    id: string
    title: string
    artist: string
    price: number
    images: string[]
  }): boolean {
    try {
      const cart = this.getCart()
      const existingItem = cart.find((item) => item.productId === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        const newItem: CartItem = {
          id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          productId: product.id,
          title: product.title,
          artist: product.artist,
          price: product.price,
          image: product.images[0] || "/placeholder.svg",
          quantity: 1,
          addedAt: new Date().toISOString(),
        }
        cart.push(newItem)
      }

      localStorage.setItem(this.storageKey, JSON.stringify(cart))
      this.notifyCartUpdate()
      return true
    } catch (error) {
      console.error("Error adding to cart:", error)
      return false
    }
  }

  removeFromCart(cartItemId: string): boolean {
    try {
      const cart = this.getCart()
      const updatedCart = cart.filter((item) => item.id !== cartItemId)
      localStorage.setItem(this.storageKey, JSON.stringify(updatedCart))
      this.notifyCartUpdate()
      return true
    } catch (error) {
      console.error("Error removing from cart:", error)
      return false
    }
  }

  updateQuantity(cartItemId: string, quantity: number): boolean {
    try {
      if (quantity <= 0) {
        return this.removeFromCart(cartItemId)
      }

      const cart = this.getCart()
      const item = cart.find((item) => item.id === cartItemId)
      if (item) {
        item.quantity = quantity
        localStorage.setItem(this.storageKey, JSON.stringify(cart))
        this.notifyCartUpdate()
        return true
      }
      return false
    } catch (error) {
      console.error("Error updating quantity:", error)
      return false
    }
  }

  clearCart(): boolean {
    try {
      localStorage.removeItem(this.storageKey)
      this.notifyCartUpdate()
      return true
    } catch (error) {
      console.error("Error clearing cart:", error)
      return false
    }
  }

  getCartTotal(): number {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  getCartItemsCount(): number {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  private notifyCartUpdate() {
    // Dispatch custom event for cart updates
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cartUpdated"))
    }
  }
}

export const cartManager = new CartManager()
