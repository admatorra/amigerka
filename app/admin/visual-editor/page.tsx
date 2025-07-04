"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Eye,
  Save,
  Trash2,
  ImageIcon,
  Type,
  MousePointer,
  Layout,
  Upload,
  Move,
  Plus,
  Settings,
  Smartphone,
  Tablet,
  Monitor,
  Undo,
  Redo,
} from "lucide-react"

interface PageElement {
  id: string
  type: "text" | "image" | "button" | "gallery" | "section"
  content: any
  position: { x: number; y: number }
  size: { width: number; height: number }
  styles: Record<string, string>
}

interface PageData {
  id: string
  name: string
  elements: PageElement[]
}

const defaultPages: PageData[] = [
  {
    id: "home",
    name: "Головна сторінка",
    elements: [
      {
        id: "hero-title",
        type: "text",
        content: { text: "Paintings That Set Your Mood" },
        position: { x: 50, y: 100 },
        size: { width: 600, height: 80 },
        styles: { fontSize: "48px", fontWeight: "bold", color: "#1f2937", textAlign: "center" },
      },
      {
        id: "hero-subtitle",
        type: "text",
        content: { text: "Each of our paintings is made by hand" },
        position: { x: 50, y: 200 },
        size: { width: 500, height: 40 },
        styles: { fontSize: "24px", color: "#6b7280", textAlign: "center" },
      },
      {
        id: "hero-button",
        type: "button",
        content: { text: "View Collection", link: "/gallery" },
        position: { x: 250, y: 280 },
        size: { width: 200, height: 50 },
        styles: { backgroundColor: "#f59e0b", color: "white", borderRadius: "8px", fontSize: "16px" },
      },
    ],
  },
]

export default function VisualEditor() {
  const [pages, setPages] = useState<PageData[]>(defaultPages)
  const [selectedPage, setSelectedPage] = useState("home")
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [draggedElement, setDraggedElement] = useState<string | null>(null)
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showGrid, setShowGrid] = useState(true)
  const [history, setHistory] = useState<PageData[][]>([defaultPages])
  const [historyIndex, setHistoryIndex] = useState(0)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData || JSON.parse(userData).role !== "admin") {
      window.location.href = "/auth/login"
    }

    // Load saved pages
    const savedPages = localStorage.getItem("armigera_pages")
    if (savedPages) {
      const parsed = JSON.parse(savedPages)
      setPages(parsed)
      setHistory([parsed])
    }
  }, [])

  const currentPage = pages.find((page) => page.id === selectedPage)
  const currentElement = currentPage?.elements.find((el) => el.id === selectedElement)

  const addToHistory = (newPages: PageData[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newPages)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setPages(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setPages(history[historyIndex + 1])
    }
  }

  const addElement = (type: PageElement["type"]) => {
    if (!currentPage) return

    const newElement: PageElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: getDefaultContent(type),
      position: { x: 100, y: 100 },
      size: getDefaultSize(type),
      styles: getDefaultStyles(type),
    }

    const newPages = pages.map((page) =>
      page.id === selectedPage ? { ...page, elements: [...page.elements, newElement] } : page,
    )

    setPages(newPages)
    addToHistory(newPages)
    setSelectedElement(newElement.id)
  }

  const updateElement = (elementId: string, updates: Partial<PageElement>) => {
    const newPages = pages.map((page) =>
      page.id === selectedPage
        ? {
            ...page,
            elements: page.elements.map((el) => (el.id === elementId ? { ...el, ...updates } : el)),
          }
        : page,
    )
    setPages(newPages)
    addToHistory(newPages)
  }

  const deleteElement = (elementId: string) => {
    const newPages = pages.map((page) =>
      page.id === selectedPage ? { ...page, elements: page.elements.filter((el) => el.id !== elementId) } : page,
    )
    setPages(newPages)
    addToHistory(newPages)
    setSelectedElement(null)
  }

  const duplicateElement = (elementId: string) => {
    if (!currentPage) return

    const element = currentPage.elements.find((el) => el.id === elementId)
    if (!element) return

    const newElement: PageElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
      position: { x: element.position.x + 20, y: element.position.y + 20 },
    }

    const newPages = pages.map((page) =>
      page.id === selectedPage ? { ...page, elements: [...page.elements, newElement] } : page,
    )

    setPages(newPages)
    addToHistory(newPages)
    setSelectedElement(newElement.id)
  }

  const getDefaultContent = (type: PageElement["type"]) => {
    switch (type) {
      case "text":
        return { text: "Новий текстовий елемент" }
      case "image":
        return { src: "/placeholder.svg?height=200&width=300", alt: "Нове зображення" }
      case "button":
        return { text: "Нова кнопка", link: "#" }
      case "gallery":
        return { images: [] }
      case "section":
        return { title: "Новий розділ" }
      default:
        return {}
    }
  }

  const getDefaultSize = (type: PageElement["type"]) => {
    switch (type) {
      case "text":
        return { width: 300, height: 40 }
      case "image":
        return { width: 300, height: 200 }
      case "button":
        return { width: 150, height: 40 }
      case "gallery":
        return { width: 600, height: 400 }
      case "section":
        return { width: 800, height: 300 }
      default:
        return { width: 200, height: 100 }
    }
  }

  const getDefaultStyles = (type: PageElement["type"]) => {
    switch (type) {
      case "text":
        return { fontSize: "16px", color: "#374151", fontFamily: "Inter" }
      case "image":
        return { borderRadius: "8px", objectFit: "cover" }
      case "button":
        return {
          backgroundColor: "#3b82f6",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: "500",
        }
      case "gallery":
        return { display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }
      case "section":
        return { backgroundColor: "#f9fafb", padding: "32px", borderRadius: "12px" }
      default:
        return {}
    }
  }

  const handleImageUpload = (elementId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      updateElement(elementId, {
        content: { ...currentElement?.content, src: e.target?.result },
      })
    }
    reader.readAsDataURL(file)
  }

  const saveChanges = () => {
    localStorage.setItem("armigera_pages", JSON.stringify(pages))
    alert("Зміни збережено успішно!")
  }

  const getDeviceWidth = () => {
    switch (deviceView) {
      case "mobile":
        return "375px"
      case "tablet":
        return "768px"
      case "desktop":
        return "100%"
      default:
        return "100%"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Візуальний редактор сайту</h1>
              <p className="text-gray-600">Редагуйте свій сайт візуально без програмування</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Device View Selector */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={deviceView === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDeviceView("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={deviceView === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDeviceView("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={deviceView === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setDeviceView("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>

              {/* History Controls */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={undo} disabled={historyIndex <= 0}>
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={redo} disabled={historyIndex >= history.length - 1}>
                  <Redo className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? "Режим редагування" : "Попередній перегляд"}
              </Button>
              <Button onClick={saveChanges}>
                <Save className="h-4 w-4 mr-2" />
                Зберегти зміни
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin">Назад до панелі</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          {/* Page Selector */}
          <div className="p-4 border-b">
            <Label className="text-sm font-medium">Виберіть сторінку</Label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full mt-2 px-3 py-2 border rounded-md"
            >
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>
          </div>

          {/* Element Tools */}
          <div className="p-4 border-b">
            <Label className="text-sm font-medium mb-3 block">Додати елементи</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => addElement("text")} className="flex items-center">
                <Type className="h-4 w-4 mr-1" />
                Текст
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement("image")} className="flex items-center">
                <ImageIcon className="h-4 w-4 mr-1" />
                Зображення
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement("button")} className="flex items-center">
                <MousePointer className="h-4 w-4 mr-1" />
                Кнопка
              </Button>
              <Button variant="outline" size="sm" onClick={() => addElement("gallery")} className="flex items-center">
                <Layout className="h-4 w-4 mr-1" />
                Галерея
              </Button>
            </div>
          </div>

          {/* Element Properties */}
          {selectedElement && currentElement && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium">Властивості елемента</Label>
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => duplicateElement(selectedElement)}
                    title="Дублювати"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteElement(selectedElement)}
                    className="text-red-600"
                    title="Видалити"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Content Properties */}
                {currentElement.type === "text" && (
                  <div>
                    <Label className="text-xs">Текстовий вміст</Label>
                    <Textarea
                      value={currentElement.content.text}
                      onChange={(e) =>
                        updateElement(selectedElement, {
                          content: { ...currentElement.content, text: e.target.value },
                        })
                      }
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                )}

                {currentElement.type === "image" && (
                  <div>
                    <Label className="text-xs">Зображення</Label>
                    <div className="mt-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(selectedElement, file)
                        }}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <Upload className="h-6 w-6 text-gray-400" />
                      </label>
                    </div>
                    <Input
                      placeholder="Alt текст зображення"
                      value={currentElement.content.alt || ""}
                      onChange={(e) =>
                        updateElement(selectedElement, {
                          content: { ...currentElement.content, alt: e.target.value },
                        })
                      }
                      className="mt-2"
                    />
                  </div>
                )}

                {currentElement.type === "button" && (
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs">Текст кнопки</Label>
                      <Input
                        value={currentElement.content.text}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            content: { ...currentElement.content, text: e.target.value },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">URL посилання</Label>
                      <Input
                        value={currentElement.content.link}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            content: { ...currentElement.content, link: e.target.value },
                          })
                        }
                        className="mt-1"
                        placeholder="/gallery"
                      />
                    </div>
                  </div>
                )}

                {/* Style Properties */}
                <div className="border-t pt-4">
                  <Label className="text-xs font-medium mb-2 block">Стилізація</Label>

                  {/* Font Size for text elements */}
                  {(currentElement.type === "text" || currentElement.type === "button") && (
                    <div className="mb-2">
                      <Label className="text-xs">Розмір шрифту</Label>
                      <Input
                        value={currentElement.styles.fontSize || "16px"}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            styles: { ...currentElement.styles, fontSize: e.target.value },
                          })
                        }
                        className="mt-1"
                        placeholder="16px"
                      />
                    </div>
                  )}

                  {/* Color */}
                  <div className="mb-2">
                    <Label className="text-xs">Колір</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type="color"
                        value={currentElement.styles.color || "#000000"}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            styles: { ...currentElement.styles, color: e.target.value },
                          })
                        }
                        className="w-8 h-8 border rounded"
                      />
                      <Input
                        value={currentElement.styles.color || "#000000"}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            styles: { ...currentElement.styles, color: e.target.value },
                          })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Background Color for buttons */}
                  {currentElement.type === "button" && (
                    <div className="mb-2">
                      <Label className="text-xs">Колір фону</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="color"
                          value={currentElement.styles.backgroundColor || "#3b82f6"}
                          onChange={(e) =>
                            updateElement(selectedElement, {
                              styles: { ...currentElement.styles, backgroundColor: e.target.value },
                            })
                          }
                          className="w-8 h-8 border rounded"
                        />
                        <Input
                          value={currentElement.styles.backgroundColor || "#3b82f6"}
                          onChange={(e) =>
                            updateElement(selectedElement, {
                              styles: { ...currentElement.styles, backgroundColor: e.target.value },
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  )}

                  {/* Border Radius */}
                  <div className="mb-2">
                    <Label className="text-xs">Закруглення кутів</Label>
                    <Input
                      value={currentElement.styles.borderRadius || "0px"}
                      onChange={(e) =>
                        updateElement(selectedElement, {
                          styles: { ...currentElement.styles, borderRadius: e.target.value },
                        })
                      }
                      className="mt-1"
                      placeholder="8px"
                    />
                  </div>
                </div>

                {/* Position */}
                <div className="border-t pt-4">
                  <Label className="text-xs font-medium mb-2 block">Позиція та розмір</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">X позиція</Label>
                      <Input
                        type="number"
                        value={currentElement.position.x}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            position: { ...currentElement.position, x: Number.parseInt(e.target.value) },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Y позиція</Label>
                      <Input
                        type="number"
                        value={currentElement.position.y}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            position: { ...currentElement.position, y: Number.parseInt(e.target.value) },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Ширина</Label>
                      <Input
                        type="number"
                        value={currentElement.size.width}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            size: { ...currentElement.size, width: Number.parseInt(e.target.value) },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Висота</Label>
                      <Input
                        type="number"
                        value={currentElement.size.height}
                        onChange={(e) =>
                          updateElement(selectedElement, {
                            size: { ...currentElement.size, height: Number.parseInt(e.target.value) },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <div
            className="relative bg-white min-h-screen mx-auto shadow-lg transition-all duration-300"
            style={{
              width: getDeviceWidth(),
              maxWidth: deviceView === "desktop" ? "none" : getDeviceWidth(),
            }}
          >
            {/* Grid overlay */}
            {showGrid && !previewMode && (
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />
            )}

            {/* Add Block Button */}
            {!previewMode && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                  onClick={() => addElement("text")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Додати блок
                </Button>
              </div>
            )}

            {currentPage?.elements.map((element) => (
              <div
                key={element.id}
                className={`absolute transition-all duration-200 ${!previewMode ? "cursor-pointer" : ""} ${
                  selectedElement === element.id && !previewMode
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : "hover:ring-1 hover:ring-gray-300"
                }`}
                style={{
                  left: element.position.x,
                  top: element.position.y,
                  width: element.size.width,
                  height: element.size.height,
                  ...element.styles,
                }}
                onClick={() => !previewMode && setSelectedElement(element.id)}
                draggable={!previewMode}
                onDragStart={() => setDraggedElement(element.id)}
                onDragEnd={(e) => {
                  if (draggedElement) {
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect()
                    if (rect) {
                      updateElement(draggedElement, {
                        position: {
                          x: Math.max(0, e.clientX - rect.left - element.size.width / 2),
                          y: Math.max(0, e.clientY - rect.top - element.size.height / 2),
                        },
                      })
                    }
                    setDraggedElement(null)
                  }
                }}
              >
                {/* Element Content */}
                {element.type === "text" && (
                  <div
                    className="w-full h-full flex items-center justify-center p-2 overflow-hidden"
                    style={{
                      textAlign: element.styles.textAlign as any,
                      wordWrap: "break-word",
                    }}
                  >
                    {element.content.text}
                  </div>
                )}

                {element.type === "image" && (
                  <img
                    src={element.content.src || "/placeholder.svg"}
                    alt={element.content.alt || ""}
                    className="w-full h-full"
                    style={{
                      borderRadius: element.styles.borderRadius,
                      objectFit: (element.styles.objectFit as any) || "cover",
                    }}
                  />
                )}

                {element.type === "button" && (
                  <button
                    className="w-full h-full flex items-center justify-center transition-all hover:opacity-90"
                    style={element.styles}
                    onClick={(e) => {
                      if (previewMode && element.content.link) {
                        window.open(element.content.link, "_blank")
                      } else {
                        e.preventDefault()
                      }
                    }}
                  >
                    {element.content.text}
                  </button>
                )}

                {/* Element Controls */}
                {selectedElement === element.id && !previewMode && (
                  <div className="absolute -top-10 left-0 flex space-x-1 bg-white shadow-lg rounded-md p-1">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0" title="Переміщення">
                      <Move className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0" title="Налаштування">
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteElement(element.id)
                      }}
                      title="Видалити"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
