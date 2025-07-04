"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Edit3 } from "lucide-react"
import Link from "next/link"

export function EditButton() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        asChild
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full w-12 h-12 p-0"
      >
        <Link href="/admin/visual-editor">
          <Edit3 className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  )
}
