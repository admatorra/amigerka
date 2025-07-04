"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Layout, Palette, Type, ImageIcon, Plus, Trash2, Edit, Eye, Move, Settings } from "lucide-react"

// Site structure data
const defaultSiteStructure = {
  pages: [
    {
      id: "home",
      name: "Home Page",
      path: "/",
      sections: ["hero", "categories", "products", "services", "artists", "blog", "newsletter"],
    },
    { id: "gallery", name: "Gallery", path: "/gallery", sections: ["header", "filters", "products-grid"] },
    { id: "about", name: "Our Story", path: "/story", sections: ["header", "content"] },
    { id: "blog", name: "Blog", path: "/blog", sections: ["header", "posts-grid"] },
    { id: "contacts", name: "Contacts", path: "/contacts", sections: ["header", "contact-form", "map"] },
  ],
  sections: {
    hero: { name: "Hero Section", type: "hero", editable: true },
    categories: { name: "Categories", type: "grid", editable: true },
    products: { name: "Products Showcase", type: "grid", editable: true },
    services: { name: "Services", type: "cards", editable: true },
    artists: { name: "Artists", type: "profiles", editable: true },
    blog: { name: "Blog Section", type: "cards", editable: true },
    newsletter: { name: "Newsletter", type: "form", editable: true },
  },
  theme: {
    primaryColor: "#f59e0b",
    secondaryColor: "#1f2937",
    backgroundColor: "#ffffff",
    textColor: "#374151",
    fontFamily: "Inter",
  },
}

export default function SiteBuilder() {
  const [siteStructure, setSiteStructure] = useState(defaultSiteStructure)
  const [selectedPage, setSelectedPage] = useState("home")
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
    }
  }, [])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call to save site structure
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Site structure saved successfully!")
    } catch (error) {
      alert("Error saving site structure")
    } finally {
      setIsLoading(false)
    }
  }

  const addNewPage = () => {
    const newPage = {
      id: `page-${Date.now()}`,
      name: "New Page",
      path: "/new-page",
      sections: ["header", "content"],
    }
    setSiteStructure((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
    }))
  }

  const addNewSection = (pageId: string) => {
    const sectionId = `section-${Date.now()}`
    setSiteStructure((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.id === pageId ? { ...page, sections: [...page.sections, sectionId] } : page,
      ),
      sections: {
        ...prev.sections,
        [sectionId]: { name: "New Section", type: "content", editable: true },
      },
    }))
  }

  const currentPage = siteStructure.pages.find((page) => page.id === selectedPage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Site Builder</h1>
              <p className="text-gray-600">Design and customize your website</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? "Edit Mode" : "Preview"}
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Page Structure */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="h-5 w-5 mr-2" />
                  Site Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {siteStructure.pages.map((page) => (
                    <div
                      key={page.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedPage === page.id ? "bg-blue-100 border-blue-300" : "bg-gray-50 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedPage(page.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{page.name}</span>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{page.path}</p>
                      <p className="text-xs text-gray-500">{page.sections.length} sections</p>
                    </div>
                  ))}
                </div>
                <Button onClick={addNewPage} className="w-full mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Page
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="layout" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Layout Tab */}
              <TabsContent value="layout" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Layout - {currentPage?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentPage?.sections.map((sectionId, index) => {
                        const section = siteStructure.sections[sectionId]
                        return (
                          <div
                            key={sectionId}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedSection === sectionId
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedSection(sectionId)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Move className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="font-medium">{section?.name || sectionId}</span>
                                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                                  {section?.type || "content"}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <Button onClick={() => addNewSection(selectedPage)} className="w-full" variant="dashed">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Section
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Type className="h-5 w-5 mr-2" />
                      Content Editor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSection ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="section-title">Section Title</Label>
                          <Input
                            id="section-title"
                            placeholder="Enter section title"
                            defaultValue={siteStructure.sections[selectedSection]?.name}
                          />
                        </div>
                        <div>
                          <Label htmlFor="section-content">Content</Label>
                          <Textarea id="section-content" placeholder="Enter section content..." rows={8} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="section-image">Background Image</Label>
                            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                              <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Click to upload image</p>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="section-settings">Section Settings</Label>
                            <div className="space-y-3 mt-2">
                              <div className="flex items-center space-x-2">
                                <Switch id="visible" />
                                <Label htmlFor="visible">Visible</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="full-width" />
                                <Label htmlFor="full-width">Full Width</Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Select a section from the layout to edit its content
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Design Tab */}
              <TabsContent value="design" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="h-5 w-5 mr-2" />
                      Theme Customization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="primary-color">Primary Color</Label>
                          <div className="flex items-center space-x-2 mt-2">
                            <input
                              type="color"
                              id="primary-color"
                              value={siteStructure.theme.primaryColor}
                              className="w-12 h-10 border rounded"
                            />
                            <Input value={siteStructure.theme.primaryColor} placeholder="#f59e0b" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="secondary-color">Secondary Color</Label>
                          <div className="flex items-center space-x-2 mt-2">
                            <input
                              type="color"
                              id="secondary-color"
                              value={siteStructure.theme.secondaryColor}
                              className="w-12 h-10 border rounded"
                            />
                            <Input value={siteStructure.theme.secondaryColor} placeholder="#1f2937" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="font-family">Font Family</Label>
                          <select
                            id="font-family"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                            value={siteStructure.theme.fontFamily}
                          >
                            <option value="Inter">Inter</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Lato">Lato</option>
                            <option value="Montserrat">Montserrat</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="background-color">Background Color</Label>
                          <div className="flex items-center space-x-2 mt-2">
                            <input
                              type="color"
                              id="background-color"
                              value={siteStructure.theme.backgroundColor}
                              className="w-12 h-10 border rounded"
                            />
                            <Input value={siteStructure.theme.backgroundColor} placeholder="#ffffff" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="p-6 rounded-lg border"
                      style={{
                        backgroundColor: siteStructure.theme.backgroundColor,
                        color: siteStructure.theme.textColor,
                        fontFamily: siteStructure.theme.fontFamily,
                      }}
                    >
                      <h2 className="text-2xl font-bold mb-4" style={{ color: siteStructure.theme.primaryColor }}>
                        Sample Heading
                      </h2>
                      <p className="mb-4">This is how your content will look with the selected theme settings.</p>
                      <button
                        className="px-4 py-2 rounded text-white"
                        style={{ backgroundColor: siteStructure.theme.primaryColor }}
                      >
                        Sample Button
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Advanced Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="meta-title">Meta Title</Label>
                            <Input id="meta-title" placeholder="Armigera Art - Handmade Paintings" />
                          </div>
                          <div>
                            <Label htmlFor="meta-description">Meta Description</Label>
                            <Textarea
                              id="meta-description"
                              placeholder="Discover unique handmade paintings..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Analytics</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="google-analytics">Google Analytics ID</Label>
                            <Input id="google-analytics" placeholder="GA-XXXXXXXXX" />
                          </div>
                          <div>
                            <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                            <Input id="facebook-pixel" placeholder="123456789" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Custom Code</h3>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="custom-css">Custom CSS</Label>
                            <Textarea
                              id="custom-css"
                              placeholder="/* Add your custom CSS here */"
                              rows={6}
                              className="font-mono text-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="custom-js">Custom JavaScript</Label>
                            <Textarea
                              id="custom-js"
                              placeholder="// Add your custom JavaScript here"
                              rows={6}
                              className="font-mono text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
