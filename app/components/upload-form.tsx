"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, UploadCloud } from "lucide-react"
import { useRouter } from "next/navigation"
import { FileDropzone } from "./FileDropzone"
import { UploadAlert } from "./UploadAlert"
import { ImageGallery } from "./image-gallery"

type MessageType = { type: "success" | "error"; text: string } | null

/**
 * UploadForm Component
 *
 * Provides a user interface for uploading images to an S3 bucket, with live preview, upload progress, error/success alerts, and a gallery of uploaded images.
 *
 * Features:
 * - Drag-and-drop or click-to-select image upload (PNG, JPG, GIF up to 10MB).
 * - Displays a preview of the selected image before upload.
 * - Shows upload progress and disables the upload button while uploading.
 * - Displays success or error messages after upload attempts.
 * - Refreshes the image gallery automatically after a successful upload.
 * - Uses client-side state for file selection, preview, and gallery refresh.
 *
 * Usage:
 * ```tsx
 * <UploadForm />
 * ```
 *
 * Internal Components Used:
 * - FileDropzone: Handles file selection and preview.
 * - UploadAlert: Shows upload status messages.
 * - ImageGallery: Displays the list of uploaded images.
 *
 * Accessibility:
 * - All form controls are accessible via keyboard and screen readers.
 */

export function UploadForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<MessageType>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [galleryRefreshKey, setGalleryRefreshKey] = useState(0)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile))
    } else {
      setPreviewUrl(null)
    }
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(null)

    if (!file) {
      setMessage({ type: "error", text: "No file selected" })
      return
    }

    setIsUploading(true)
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          "X-Filename": file.name,
        },
        body: file,
      })

      if (res.ok) {
        const data = await res.json()
        setMessage({ type: "success", text: `Image uploaded successfully! ${data.url ? `URL: ${data.url}` : ""}` })
        setFile(null)
        setPreviewUrl(null)
        setGalleryRefreshKey((k) => k + 1) // trigger gallery refresh
        // router.refresh() // Not needed for client-side gallery
      } else {
        const error = await res.json()
        setMessage({ type: "error", text: error.error || "Failed to upload image" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[80vh] bg-gradient-to-br  dark:from-gray-900 dark:to-gray-950 px-2">
      <Card className="w-full shadow-xl rounded-2xl border-0">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-2">
            <UploadCloud className="w-12 h-12 text-blue-500 mb-2" />
            <CardTitle className="text-2xl font-bold">Upload Image</CardTitle>
            <CardDescription className="text-gray-500">
              Upload an image to your S3 bucket. Supported formats: PNG, JPG, GIF up to 10MB.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {message && (
            <div className="mb-4">
              <UploadAlert message={message} />
            </div>
          )}

          <form id="upload-form" onSubmit={handleUpload} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <FileDropzone previewUrl={previewUrl} onFileChange={handleFileChange} />
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                className=" h-12 text-lg font-semibold rounded-lg"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Image"
                )}
              </Button>
            </div>
          </form>

          <ImageGallery refreshKey={galleryRefreshKey} />

        </CardContent>
      </Card>
    </div>
  )
}