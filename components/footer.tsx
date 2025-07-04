"use client"

import { useState } from "react"
import Link from "next/link"
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react"
import { ServiceContactForm } from "@/components/service-contact-form"

export function Footer() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    { name: "Custom Paintings", nameUa: "Індивідуальні картини" },
    { name: "Art Restoration", nameUa: "Реставрація картин" },
    { name: "Art Consultation", nameUa: "Мистецькі консультації" },
    { name: "Workshops", nameUa: "Майстер-класи" },
  ]

  return (
    <>
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-gray-900">ARMIGERA ART</h3>
              <p className="text-gray-600 mb-4">
                Ми створюємо стильні картини, які приносять красу та естетику у ваше життя.
              </p>
              <div className="flex space-x-4">
                <Link href="https://instagram.com/zorianna_pavlyshyn" className="text-gray-400 hover:text-gray-600">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="https://facebook.com" className="text-gray-400 hover:text-gray-600">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="https://x.com" className="text-gray-400 hover:text-gray-600">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="https://linkedin.com" className="text-gray-400 hover:text-gray-600">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Швидкі посилання</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/gallery" className="text-gray-600 hover:text-gray-900">
                    Галерея
                  </Link>
                </li>
                <li>
                  <Link href="/custom-orders" className="text-gray-600 hover:text-gray-900">
                    Індивідуальні замовлення
                  </Link>
                </li>
                <li>
                  <Link href="/story" className="text-gray-600 hover:text-gray-900">
                    Наша історія
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="text-gray-600 hover:text-gray-900">
                    Контакти
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                    Блог
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Послуги</h4>
              <div className="space-y-2">
                {services.map((service) => (
                  <button
                    key={service.name}
                    onClick={() => setSelectedService(service.name)}
                    className="block text-gray-600 hover:text-gray-900 text-left transition-colors"
                  >
                    {service.nameUa}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Контакти</h4>
              <div className="space-y-2 text-gray-600">
                <p>вул. Пікова 72А</p>
                <p>Львів, Україна</p>
                <p>+380 95 911 6065</p>
                <p>armigera.art@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Armigera Art. Всі права захищені.</p>
            <p className="mt-2">Створено з ❤️ командою Armigera Art</p>
          </div>
        </div>
      </footer>

      {/* Service Contact Form */}
      {selectedService && (
        <ServiceContactForm
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          serviceName={selectedService}
        />
      )}
    </>
  )
}
