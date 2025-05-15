import React from "react"
import { UploadCloud } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FileDropzoneProps {
  /**
   * The URL of the image to preview. If null, a placeholder UI is shown.
   */
  previewUrl: string | null
  /**
   * Callback fired when the user selects a file.
   * Receives the file input change event.
   */
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * FileDropzone Component
 *
 * A stylized file input dropzone for uploading images.
 * - Shows a preview if an image URL is provided.
 * - Otherwise, displays a drag-and-drop area with upload instructions.
 * - Accepts PNG, JPG, GIF images up to 10MB.
 *
 * ## Props
 * - `previewUrl`: string | null — The URL of the image to preview, or null to show the placeholder.
 * - `onFileChange`: (e: React.ChangeEvent<HTMLInputElement>) => void — Handler for file input changes.
 *
 * ## Example Usage
 * ```tsx
 * <FileDropzone
 *   previewUrl={imageUrl}
 *   onFileChange={handleFileChange}
 * />
 * ```
 */

export function FileDropzone({ previewUrl, onFileChange }: FileDropzoneProps) {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      >
        {previewUrl ? (
          <div className="relative w-full h-full">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <Input
          id="file-upload"
          name="file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          required
        />
      </label>
    </div>
  )
}