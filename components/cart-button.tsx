"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { cartManager } from "@/lib/cart"
import { db, type Product } from "@/lib/database"
import { toast } from "@/hooks/use-toast"

interface CartButtonProps {
  productId: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showIcon?: boolean
  children?: React.ReactNode
}

export function CartButton({
  productId,
  variant = "default",
  size = "default",
  showIcon = true,
  children,
}: CartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    try {
      const product = db.getById<Product>("products", productId)

      if (!product) {
        toast({
          title: "Error",
          description: "Product not found",
          variant: "destructive",
        })
        return
      }

      if (product.status !== "active") {
        toast({
          title: "Unavailable",
          description: "This product is not available for purchase",
          variant: "destructive",
        })
        return
      }

      const success = cartManager.addToCart(product)

      if (success) {
        toast({
          title: "Added to cart!",
          description: `${product.title} has been added to your cart`,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add product to cart",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleAddToCart} disabled={isAdding}>
      {showIcon && <ShoppingCart className="w-4 h-4 mr-2" />}
      {isAdding ? "Adding..." : children || "Add to Cart"}
    </Button>
  )
}
