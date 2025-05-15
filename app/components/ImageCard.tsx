import React, { useState } from "react"

export interface ImageCardProps {
  url: string
  keyName: string
  lastModified: string
  imageUrl?: string
}

/**
 * ImageCard Component
 *
 * Displays a thumbnail image card with metadata and supports previewing the full image in a modal dialog.
 *
 * Features:
 * - Shows a thumbnail image, key name, and last modified date.
 * - Opens a modal with a larger image preview and metadata when clicked or activated via keyboard.
 * - Modal can be closed by clicking outside, pressing the close button, or using keyboard navigation.
 *
 * Props:
 * @param {string} url - The URL of the thumbnail image to display in the card.
 * @param {string} keyName - The unique key or name of the image (displayed as metadata).
 * @param {string} lastModified - The ISO string representing the last modification date of the image.
 * @param {string} [imageUrl] - (Optional) The URL of the full-size image to display in the modal preview.
 *
 * Accessibility:
 * - The card is keyboard accessible (can be opened with Enter or Space).
 * - Modal includes an accessible close button.
 *
 * Usage:
 * ```tsx
 * <ImageCard
 *   url="https://example.com/thumb.jpg"
 *   keyName="image1.jpg"
 *   lastModified="2024-06-01T12:00:00Z"
 *   imageUrl="https://example.com/full.jpg"
 * />
 * ```
 */

export function ImageCard({ url, keyName, lastModified, imageUrl }: ImageCardProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        className="rounded-lg overflow-hidden shadow border bg-white dark:bg-gray-900 cursor-pointer"
        onClick={() => setShowModal(true)}
        tabIndex={0}
        role="button"
        aria-label={`Preview ${keyName}`}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") setShowModal(true)
        }}
      >
        <img
          src={url}
          alt={keyName}
          className="w-full h-48 object-cover"
        />
        <div className="p-2">
          <div className="text-xs text-gray-500 truncate">{keyName}</div>
          <div className="text-xs text-gray-400">{new Date(lastModified).toLocaleString()}</div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 relative max-w-lg w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setShowModal(false)}
              aria-label="Close preview"
            >
              &times;
            </button>
            <img
              src={imageUrl}
              alt={keyName}
              className="w-full max-h-[70vh] object-contain rounded"
            />
            <div className="mt-2 text-xs text-gray-500 truncate">{keyName}</div>
            <div className="text-xs text-gray-400">{new Date(lastModified).toLocaleString()}</div>
          </div>
        </div>
      )}
    </>
  )
}