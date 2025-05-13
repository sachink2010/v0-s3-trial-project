"use server"

export interface S3Image {
  key: string
  url: string
  lastModified?: string
}

export async function listImages(): Promise<S3Image[]> {
  try {
    // Mock data representing images from S3
    const mockImages: S3Image[] = [
      {
        key: "uploads/sample-image-1.jpg",
        url: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
        lastModified: new Date().toISOString(),
      },
      {
        key: "uploads/sample-image-2.jpg",
        url: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
        lastModified: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        key: "uploads/sample-image-3.jpg",
        url: "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
        lastModified: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ]

    return mockImages
  } catch (error) {
    console.error("Error listing images:", error)
    return []
  }
}
