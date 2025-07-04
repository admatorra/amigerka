"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cartManager } from "@/lib/cart"

export function CartIcon() {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // Initial load
    setItemCount(cartManager.getCartItemsCount())

    // Listen for cart updates
    const handleCartUpdate = () => {
      setItemCount(cartManager.getCartItemsCount())
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  return (
    <Link href="/cart">
      <Button variant="ghost" size="sm" className="relative">
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
