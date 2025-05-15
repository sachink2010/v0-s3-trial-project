import React from "react"
import { ImageCard, ImageCardProps } from "./ImageCard"

/**
 * ImageGrid Component
 *
 * Renders a responsive grid of image cards.
 *
 * Features:
 * - Accepts an array of image objects and displays each as an ImageCard.
 * - Responsive layout: 1 column on mobile, 2 on small screens, 5 on medium and up.
 * - Shows a message if no images are provided.
 *
 * Props:
 * @param {ImageCardProps[]} images - Array of image objects to display in the grid.
 *
 * Usage:
 * ```tsx
 * <ImageGrid images={[
 *   { url: "thumb1.jpg", keyName: "img1.jpg", lastModified: "2024-06-01T12:00:00Z", imageUrl: "full1.jpg" },
 *   { url: "thumb2.jpg", keyName: "img2.jpg", lastModified: "2024-06-02T12:00:00Z", imageUrl: "full2.jpg" }
 * ]} />
 * ```
 */

interface ImageGridProps {
  images: ImageCardProps[]
}

export function ImageGrid({ images }: ImageGridProps) {
  if (!images.length) {
    return <div className="text-center text-gray-500">No images found.</div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {images.map((img) => (
        <ImageCard
          key={img.keyName}
          url={img.url}
          imageUrl={img.imageUrl}
          keyName={img.keyName}
          lastModified={img.lastModified}
        />
      ))}
    </div>
  )
}