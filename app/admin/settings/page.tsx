"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    siteName: "ARMIGERA ART",
    siteDescription: "Handmade paintings that set your mood",
    contactEmail: "armigera.art@gmail.com",
    contactPhone: "+380 95 911 6065",
    address: "Peakline St. 72 A, Lviv, Ukraine",
    instagramHandle: "@zorianna_pavlyshyn",
    heroTitle: "Paintings That Set Your Mood",
    heroSubtitle: "Each of our paintings is made by hand",
    heroPrice: "All for $150",
    enableNewsletter: true,
    enableBlog: true,
    enableCustomOrders: true,
    maintenanceMode: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
              <p className="text-gray-600">Configure your website settings</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/admin">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">Settings saved successfully!</p>
          </div>
        )}

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" name="siteName" value={settings.siteName} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={settings.siteDescription}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => handleSwitchChange("maintenanceMode", checked)}
                    />
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      value={settings.contactPhone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" value={settings.address} onChange={handleChange} rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="instagramHandle">Instagram Handle</Label>
                    <Input
                      id="instagramHandle"
                      name="instagramHandle"
                      value={settings.instagramHandle}
                      onChange={handleChange}
                      placeholder="@username"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="homepage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Homepage Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input id="heroTitle" name="heroTitle" value={settings.heroTitle} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Input
                      id="heroSubtitle"
                      name="heroSubtitle"
                      value={settings.heroSubtitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="heroPrice">Hero Price Text</Label>
                    <Input id="heroPrice" name="heroPrice" value={settings.heroPrice} onChange={handleChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableNewsletter"
                      checked={settings.enableNewsletter}
                      onCheckedChange={(checked) => handleSwitchChange("enableNewsletter", checked)}
                    />
                    <Label htmlFor="enableNewsletter">Enable Newsletter Subscription</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableBlog"
                      checked={settings.enableBlog}
                      onCheckedChange={(checked) => handleSwitchChange("enableBlog", checked)}
                    />
                    <Label htmlFor="enableBlog">Enable Blog</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableCustomOrders"
                      checked={settings.enableCustomOrders}
                      onCheckedChange={(checked) => handleSwitchChange("enableCustomOrders", checked)}
                    />
                    <Label htmlFor="enableCustomOrders">Enable Custom Orders</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>
        </Tabs>
      </div>
    </div>
  )
}
