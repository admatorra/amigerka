import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ArtistsSection } from "@/components/artists-section"
import { BlogSection } from "@/components/blog-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ProductsShowcase } from "@/components/products-showcase"
import { ThemeCategories } from "@/components/theme-categories"

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ThemeCategories />
      <ProductsShowcase />
      <ServicesSection />
      <ArtistsSection />
      <WhyUsSection />
      <BlogSection />
      <NewsletterSection />
    </main>
  )
}
