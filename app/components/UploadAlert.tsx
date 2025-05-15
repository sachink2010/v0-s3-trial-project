import React from "react"

/**
 * UploadAlert Component
 *
 * Displays a styled alert message indicating the result of an upload operation.
 *
 * Features:
 * - Shows a success or error message with appropriate background and text color.
 * - Renders nothing if no message is provided.
 *
 * Props:
 * @param {Object} message - The alert message object or null.
 * @param {"success" | "error"} message.type - The type of alert to display (success or error).
 * @param {string} message.text - The text content of the alert.
 *
 * Usage:
 * ```tsx
 * <UploadAlert message={{ type: "success", text: "Upload complete!" }} />
 * <UploadAlert message={{ type: "error", text: "Upload failed." }} />
 * ```
 */
interface UploadAlertProps {
  message: { type: "success" | "error"; text: string } | null
}

export function UploadAlert({ message }: UploadAlertProps) {
  if (!message) return null
  return (
    <div
      className={`p-3 rounded-md ${
        message.type === "success"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {message.text}
    </div>
  )
}