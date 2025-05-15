"use server"

import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"
import { UPLOAD_API_URL } from "../constants/api"

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File

    if (!file) {
      return { success: false, error: "No file provided" }
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      return { success: false, error: "File must be an image" }
    }

    // Prepare the API endpoint and headers
    const fileBuffer = await file.arrayBuffer()
    const fileName = file.name.replace(/\s/g, "-")

    // POST the image as binary data
    const response = await fetch(UPLOAD_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
        "X-Filename": fileName,
      },
      body: Buffer.from(fileBuffer),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return { success: false, error: `Upload failed: ${errorText}` }
    }

    // Get the image URL from the API response
    const result = await response.json()
    const uploadedUrl = result.url || ""

    // Revalidate the path to show the new image
    revalidatePath("/")

    return {
      success: true,
      fileKey: `uploads/${uuidv4()}-${fileName}`,
      url: uploadedUrl,
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { success: false, error: "Failed to upload file" }
  }
}
