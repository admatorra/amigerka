// Simple localStorage-based database for demo purposes
export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "user"
  phone?: string
  address?: string
  createdAt: string
  lastLogin?: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  artist: string
  dimensions?: string
  dimensionsInches?: string // Додати це поле
  materials?: string
  technique?: string
  status: "active" | "draft" | "sold"
  images: string[]
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  status: "draft" | "published"
  tags: string[]
  featuredImage?: string
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  items: {
    productId: string
    title: string
    price: number
    quantity: number
  }[]
  total: number
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
  }
  createdAt: string
  updatedAt: string
}

class Database {
  private getStorageKey(table: string): string {
    return `armigera_${table}`
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Initialize database with admin user
  initializeData(): void {
    const adminExists = this.getUserByEmail("admin@armigera.art")
    if (!adminExists) {
      this.create<User>("users", {
        name: "Admin User",
        email: "admin@armigera.art",
        password: "admin123",
        role: "admin",
        createdAt: new Date().toISOString(),
      })
    }
  }

  // Generic CRUD operations
  create<T extends { id?: string }>(table: string, data: Omit<T, "id">): T {
    const items = this.getAll<T>(table)
    const newItem = {
      ...data,
      id: this.generateId(),
    } as T

    items.push(newItem)
    localStorage.setItem(this.getStorageKey(table), JSON.stringify(items))
    return newItem
  }

  getAll<T>(table: string): T[] {
    const data = localStorage.getItem(this.getStorageKey(table))
    return data ? JSON.parse(data) : []
  }

  getById<T extends { id: string }>(table: string, id: string): T | null {
    const items = this.getAll<T>(table)
    return items.find((item) => item.id === id) || null
  }

  update<T extends { id: string }>(table: string, id: string, updates: Partial<T>): T | null {
    const items = this.getAll<T>(table)
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) return null

    items[index] = { ...items[index], ...updates }
    localStorage.setItem(this.getStorageKey(table), JSON.stringify(items))
    return items[index]
  }

  delete(table: string, id: string): boolean {
    const items = this.getAll(table)
    const filteredItems = items.filter((item) => item.id !== id)

    if (filteredItems.length === items.length) return false

    localStorage.setItem(this.getStorageKey(table), JSON.stringify(filteredItems))
    return true
  }

  clear(table: string): void {
    localStorage.removeItem(this.getStorageKey(table))
  }

  // User-specific methods
  getUserByEmail(email: string): User | null {
    const users = this.getAll<User>("users")
    return users.find((user) => user.email === email) || null
  }

  // Statistics
  getStats() {
    const products = this.getAll<Product>("products")
    const users = this.getAll<User>("users").filter((u) => u.role === "user")
    const orders = this.getAll<Order>("orders")
    const posts = this.getAll<BlogPost>("blog_posts")

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

    return {
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: orders.length,
      totalPosts: posts.filter((p) => p.status === "published").length,
      totalRevenue,
      recentOrders: orders.slice(-5).reverse(),
      recentProducts: products.slice(-5).reverse(),
    }
  }
}

export const db = new Database()

// Initialize on first load
if (typeof window !== "undefined") {
  db.initializeData()
}
