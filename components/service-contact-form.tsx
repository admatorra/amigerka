"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { db } from "@/lib/database"

interface ServiceContactFormProps {
  isOpen: boolean
  onClose: () => void
  serviceName: string
}

export function ServiceContactForm({ isOpen, onClose, serviceName }: ServiceContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Зберігаємо заявку в базу даних
      const inquiry = {
        service: serviceName,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        message: formData.message,
        status: "new",
        createdAt: new Date().toISOString(),
      }

      db.create("service_inquiries", inquiry)

      alert("Дякуємо! Ваша заявка надіслана. Ми зв'яжемося з вами найближчим часом.")

      // Очищаємо форму
      setFormData({ name: "", email: "", phone: "", message: "" })
      onClose()
    } catch (error) {
      alert("Помилка при відправці заявки. Спробуйте ще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Замовити послугу: {serviceName}</DialogTitle>
          <DialogDescription>Заповніть форму і ми зв'яжемося з вами для обговорення деталей</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Ім'я *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="message">Повідомлення</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Опишіть що вас цікавить..."
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Скасувати
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Відправляємо..." : "Відправити"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
