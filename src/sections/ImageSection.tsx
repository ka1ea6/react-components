import { cn } from "@/lib/utils"
import Image from "next/image"

export interface ContentSectionProps {
  className?: string
  children: React.ReactNode
  image?: string
  imageAlt?: string
  imagePosition?: "left" | "right"
  overlay?: boolean
}

export function ImageSection({
  className,
  children,
  image = "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
  imageAlt = "Professional presentation in modern office setting",
  imagePosition = "left",
  overlay = true,
}: ContentSectionProps) {
  return (
    <section className={cn("relative min-h-[50vh] w-full overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full">
        <Image src={image || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
        {overlay && (
          <div
            className="absolute inset-0"
            style={{
              background:
                imagePosition === "left"
                  ? "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)"
                  : "linear-gradient(-90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
            }}
          />
        )}
      </div>

      {/* Content Positioning */}
      <div
        className={cn(
          "relative w-full max-w-8xl mx-auto px-4 md:px-6 lg:px-8",
          "flex items-center",
          imagePosition === "left" ? "justify-end" : "justify-start",
        )}
      >
        <div className={cn("w-full max-w-xl py-12", imagePosition === "left" ? "ml-auto" : "mr-auto")}>{children}</div>
      </div>
    </section>
  )
}

