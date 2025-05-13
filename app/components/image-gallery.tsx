"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { listImages } from "../actions/list-images"
import type { S3Image } from "../actions/list-images"

export function ImageGallery() {
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
  }, [])

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
          <CardDescription>Loading images...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-full min-h-[300px] rounded-lg bg-gray-50 dark:bg-gray-800 animate-pulse flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Loading images...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Image Gallery</CardTitle>
        <CardDescription>
          {images.length
            ? `Showing ${images.length} image${images.length === 1 ? "" : "s"} from your S3 bucket`
            : "No images found in your S3 bucket"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.key}
                className="relative group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="aspect-square relative">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.key.split("/").pop() || "Image"}
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                  <div className="p-3 w-full text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-sm font-medium truncate">{image.key.split("/").pop()}</p>
                    {image.lastModified && (
                      <p className="text-xs opacity-80">{new Date(image.lastModified).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Upload your first image to see it here!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
