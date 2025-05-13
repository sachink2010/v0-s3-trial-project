"use server"

import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

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

    // In a real application, you would upload the file to S3 here
    // For now, we'll simulate a successful upload

    // Generate a mock URL for the uploaded image
    const mockImageUrl = "https://images.unsplash.com/photo-1682687982501-1e58ab814714"

    // Revalidate the path to show the new image
    revalidatePath("/")

    return {
      success: true,
      fileKey: `uploads/${uuidv4()}-${file.name.replace(/\s/g, "-")}`,
      url: mockImageUrl,
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return { success: false, error: "Failed to upload file" }
  }
}
