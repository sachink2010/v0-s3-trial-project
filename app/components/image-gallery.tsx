"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { listImages } from "../actions/list-images"
import type { S3Image } from "../actions/list-images"
import { ImageGrid } from "./ImageGrid"

/**
 * ImageGallery Component
 * 
 * Displays a gallery of images fetched from an S3 bucket, with loading and error states.
 * 
 * Features:
 * - Fetches images asynchronously using the `listImages` action.
 * - Shows a loading indicator while images are being fetched.
 * - Displays an error message if image fetching fails.
 * - Renders images in a responsive grid using the `ImageGrid` component.
 * - Supports external refresh via the `refreshKey` prop.
 * 
 * Props:
 * @param {number} [refreshKey] - Optional key to trigger a refresh of the image list when changed.
 * 
 * Usage:
 * ```tsx
 * <ImageGallery />
 * <ImageGallery refreshKey={someNumber} />
 * ```
 */

type ImageGalleryProps = {
  refreshKey?: number
}

export function ImageGallery({ refreshKey }: ImageGalleryProps) {
  const [images, setImages] = useState<S3Image[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true)
        const fetchedImages = await listImages()
        setImages(fetchedImages)
        setError(null)
      } catch (err) {
        console.error("Error fetching images:", err)
        setError("Failed to load images")
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [refreshKey])

  if (loading) {
    return (
      <Card className="w-full border-0 border-none">
        <CardHeader>
          <CardDescription>Loading images...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full border-0 border-none">
        <CardHeader>
          <CardTitle>Images Gallery</CardTitle>
          <CardDescription className="text-red-500">Error loading images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    images.length > 0? <Card className="w-full border-0 border-none">
      <CardHeader>
        <CardTitle>Images Gallery</CardTitle>
        <CardDescription>
          {images.length
            ? `Showing ${images.length} image${images.length === 1 ? "" : "s"} from your S3 bucket`
            : "No images found in your S3 bucket"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImageGrid
          images={images.map((img) => ({
            url: img.thumbnailUrl,
            keyName: img.key,
            imageUrl: img?.imageUrl,
            lastModified: img.lastModified,
          }))}
        />
      </CardContent>
    </Card>:null
  )
}
