"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Settings,
  Zap,
  Globe,
  CreditCard,
  Truck,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: any
  enabled: boolean
  configured: boolean
  settings: Record<string, any>
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "email",
      name: "Адреса ел. пошти",
      description: "Налаштування email для отримання замовлень та повідомлень",
      icon: Mail,
      enabled: true,
      configured: true,
      settings: {
        email: "armigera.art@gmail.com",
        smtp_host: "smtp.gmail.com",
        smtp_port: "587",
      },
    },
    {
      id: "telegram",
      name: "Telegram",
      description: "Отримання повідомлень про замовлення в Telegram",
      icon: Send,
      enabled: false,
      configured: false,
      settings: {
        bot_token: "",
        chat_id: "",
      },
    },
    {
      id: "viber",
      name: "Viber",
      description: "Повідомлення через Viber Business",
      icon: MessageCircle,
      enabled: false,
      configured: false,
      settings: {
        auth_token: "",
        sender_name: "",
      },
    },
    {
      id: "messenger",
      name: "Messenger",
      description: "Facebook Messenger для клієнтської підтримки",
      icon: MessageCircle,
      enabled: false,
      configured: false,
      settings: {
        page_access_token: "",
        verify_token: "",
      },
    },
    {
      id: "nova_poshta",
      name: "Нова Пошта",
      description: "Інтеграція з Новою Поштою для доставки",
      icon: Truck,
      enabled: false,
      configured: false,
      settings: {
        api_key: "",
        sender_ref: "",
      },
    },
    {
      id: "liqpay",
      name: "LiqPay",
      description: "Прийом платежів через LiqPay",
      icon: CreditCard,
      enabled: false,
      configured: false,
      settings: {
        public_key: "",
        private_key: "",
      },
    },
  ])

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
    }

    // Load saved integrations
    const savedIntegrations = localStorage.getItem("armigera_integrations")
    if (savedIntegrations) {
      setIntegrations(JSON.parse(savedIntegrations))
    }
  }, [])

  const updateIntegration = (id: string, updates: Partial<Integration>) => {
    const updated = integrations.map((integration) =>
      integration.id === id ? { ...integration, ...updates } : integration,
    )
    setIntegrations(updated)
    localStorage.setItem("armigera_integrations", JSON.stringify(updated))
  }

  const toggleIntegration = (id: string) => {
    const integration = integrations.find((i) => i.id === id)
    if (integration) {
      updateIntegration(id, { enabled: !integration.enabled })
    }
  }

  const saveIntegrationSettings = (id: string, settings: Record<string, any>) => {
    const configured = Object.values(settings).every((value) => value && value.toString().trim() !== "")
    updateIntegration(id, { settings, configured })
    alert("Налаштування збережено!")
  }

  const testIntegration = async (id: string) => {
    const integration = integrations.find((i) => i.id === id)
    if (!integration) return

    // Simulate API test
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (integration.configured) {
        alert(`✅ Тест ${integration.name} пройшов успішно!`)
      } else {
        alert(`❌ Помилка: ${integration.name} не налаштовано`)
      }
    } catch (error) {
      alert(`❌ Помилка тестування ${integration.name}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Інтеграції</h1>
              <p className="text-gray-600">Підключіть свої улюблені сервіси</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/admin">Назад до панелі</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">Підключіть свої улюблені сервіси</h3>
                  <p className="text-blue-700">
                    Отримайте максимальну користь від сайту, підключивши його до інших сервісів із нашого списку
                    інтеграцій, який постійно доповнюється.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Integrations List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration) => {
                const Icon = integration.icon
                return (
                  <Card
                    key={integration.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedIntegration?.id === integration.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedIntegration(integration)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg ${integration.enabled ? "bg-green-100" : "bg-gray-100"}`}>
                            <Icon className={`h-6 w-6 ${integration.enabled ? "text-green-600" : "text-gray-600"}`} />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {integration.enabled && (
                                <Badge variant="default" className="text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Активно
                                </Badge>
                              )}
                              {integration.configured ? (
                                <Badge variant="secondary" className="text-xs">
                                  Налаштовано
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Потребує налаштування
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={integration.enabled}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Integration Settings */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Налаштування
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedIntegration ? (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <selectedIntegration.icon className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">{selectedIntegration.name}</h3>
                        <p className="text-sm text-gray-600">{selectedIntegration.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Email Settings */}
                      {selectedIntegration.id === "email" && (
                        <>
                          <div>
                            <Label htmlFor="email">Email адреса</Label>
                            <Input
                              id="email"
                              value={selectedIntegration.settings.email || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, email: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="smtp_host">SMTP Host</Label>
                            <Input
                              id="smtp_host"
                              value={selectedIntegration.settings.smtp_host || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, smtp_host: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="smtp.gmail.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="smtp_port">SMTP Port</Label>
                            <Input
                              id="smtp_port"
                              value={selectedIntegration.settings.smtp_port || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, smtp_port: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="587"
                            />
                          </div>
                        </>
                      )}

                      {/* Telegram Settings */}
                      {selectedIntegration.id === "telegram" && (
                        <>
                          <div>
                            <Label htmlFor="bot_token">Bot Token</Label>
                            <Input
                              id="bot_token"
                              value={selectedIntegration.settings.bot_token || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, bot_token: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                            />
                          </div>
                          <div>
                            <Label htmlFor="chat_id">Chat ID</Label>
                            <Input
                              id="chat_id"
                              value={selectedIntegration.settings.chat_id || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, chat_id: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="123456789"
                            />
                          </div>
                        </>
                      )}

                      {/* Viber Settings */}
                      {selectedIntegration.id === "viber" && (
                        <>
                          <div>
                            <Label htmlFor="auth_token">Auth Token</Label>
                            <Input
                              id="auth_token"
                              value={selectedIntegration.settings.auth_token || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, auth_token: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="Your Viber auth token"
                            />
                          </div>
                          <div>
                            <Label htmlFor="sender_name">Sender Name</Label>
                            <Input
                              id="sender_name"
                              value={selectedIntegration.settings.sender_name || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, sender_name: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="Armigera Art"
                            />
                          </div>
                        </>
                      )}

                      {/* Messenger Settings */}
                      {selectedIntegration.id === "messenger" && (
                        <>
                          <div>
                            <Label htmlFor="page_access_token">Page Access Token</Label>
                            <Input
                              id="page_access_token"
                              value={selectedIntegration.settings.page_access_token || ""}
                              onChange={(e) => {
                                const newSettings = {
                                  ...selectedIntegration.settings,
                                  page_access_token: e.target.value,
                                }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="Your Facebook page access token"
                            />
                          </div>
                          <div>
                            <Label htmlFor="verify_token">Verify Token</Label>
                            <Input
                              id="verify_token"
                              value={selectedIntegration.settings.verify_token || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, verify_token: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="Your verify token"
                            />
                          </div>
                        </>
                      )}

                      {/* Nova Poshta Settings */}
                      {selectedIntegration.id === "nova_poshta" && (
                        <>
                          <div>
                            <Label htmlFor="api_key">API Key</Label>
                            <Input
                              id="api_key"
                              value={selectedIntegration.settings.api_key || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, api_key: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="Your Nova Poshta API key"
                            />
                          </div>
                          <div>
                            <Label htmlFor="sender_ref">Sender Ref</Label>
                            <Input
                              id="sender_ref"
                              value={selectedIntegration.settings.sender_ref || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, sender_ref: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="Sender reference"
                            />
                          </div>
                        </>
                      )}

                      {/* LiqPay Settings */}
                      {selectedIntegration.id === "liqpay" && (
                        <>
                          <div>
                            <Label htmlFor="public_key">Public Key</Label>
                            <Input
                              id="public_key"
                              value={selectedIntegration.settings.public_key || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, public_key: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="Your LiqPay public key"
                            />
                          </div>
                          <div>
                            <Label htmlFor="private_key">Private Key</Label>
                            <Input
                              id="private_key"
                              type="password"
                              value={selectedIntegration.settings.private_key || ""}
                              onChange={(e) => {
                                const newSettings = { ...selectedIntegration.settings, private_key: e.target.value }
                                setSelectedIntegration({ ...selectedIntegration, settings: newSettings })
                              }}
                              placeholder="Your LiqPay private key"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={() => saveIntegrationSettings(selectedIntegration.id, selectedIntegration.settings)}
                        className="w-full"
                      >
                        Зберегти налаштування
                      </Button>
                      <Button
                        onClick={() => testIntegration(selectedIntegration.id)}
                        variant="outline"
                        className="w-full"
                      >
                        Тестувати підключення
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Globe className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>Виберіть інтеграцію для налаштування</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
