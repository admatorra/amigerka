"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/database"

interface ServiceInquiry {
  id: string
  service: string
  customerName: string
  customerEmail: string
  customerPhone: string
  message: string
  status: "new" | "contacted" | "completed"
  createdAt: string
}

export default function CRMPage() {
  const [inquiries, setInquiries] = useState<ServiceInquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInquiries()
  }, [])

  const loadInquiries = () => {
    const allInquiries = db.getAll<ServiceInquiry>("service_inquiries")
    setInquiries(allInquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    setLoading(false)
  }

  const updateInquiryStatus = (id: string, status: ServiceInquiry["status"]) => {
    db.update("service_inquiries", id, { status })
    loadInquiries()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Нова"
      case "contacted":
        return "Зв'язались"
      case "completed":
        return "Завершено"
      default:
        return status
    }
  }

  const filterInquiries = (status?: string) => {
    if (!status) return inquiries
    return inquiries.filter((inquiry) => inquiry.status === status)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">CRM - Заявки на послуги</h1>
        <p className="text-gray-600 mt-2">Управління заявками клієнтів на послуги</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Всі ({inquiries.length})</TabsTrigger>
          <TabsTrigger value="new">Нові ({filterInquiries("new").length})</TabsTrigger>
          <TabsTrigger value="contacted">Зв'язались ({filterInquiries("contacted").length})</TabsTrigger>
          <TabsTrigger value="completed">Завершені ({filterInquiries("completed").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <InquiriesList inquiries={inquiries} onUpdateStatus={updateInquiryStatus} />
        </TabsContent>
        <TabsContent value="new">
          <InquiriesList inquiries={filterInquiries("new")} onUpdateStatus={updateInquiryStatus} />
        </TabsContent>
        <TabsContent value="contacted">
          <InquiriesList inquiries={filterInquiries("contacted")} onUpdateStatus={updateInquiryStatus} />
        </TabsContent>
        <TabsContent value="completed">
          <InquiriesList inquiries={filterInquiries("completed")} onUpdateStatus={updateInquiryStatus} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function InquiriesList({
  inquiries,
  onUpdateStatus,
}: {
  inquiries: ServiceInquiry[]
  onUpdateStatus: (id: string, status: ServiceInquiry["status"]) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Нова"
      case "contacted":
        return "Зв'язались"
      case "completed":
        return "Завершено"
      default:
        return status
    }
  }

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Немає заявок для відображення</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => (
        <Card key={inquiry.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{inquiry.service}</CardTitle>
                <CardDescription>
                  {inquiry.customerName} • {inquiry.customerEmail}
                  {inquiry.customerPhone && ` • ${inquiry.customerPhone}`}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(inquiry.status)}>{getStatusText(inquiry.status)}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {inquiry.message && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Повідомлення:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{inquiry.message}</p>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{new Date(inquiry.createdAt).toLocaleString("uk-UA")}</span>
              <div className="space-x-2">
                {inquiry.status === "new" && (
                  <Button size="sm" variant="outline" onClick={() => onUpdateStatus(inquiry.id, "contacted")}>
                    Позначити як "Зв'язались"
                  </Button>
                )}
                {inquiry.status === "contacted" && (
                  <Button size="sm" onClick={() => onUpdateStatus(inquiry.id, "completed")}>
                    Завершити
                  </Button>
                )}
                {inquiry.status === "completed" && (
                  <Button size="sm" variant="outline" onClick={() => onUpdateStatus(inquiry.id, "new")}>
                    Повернути в "Нові"
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
