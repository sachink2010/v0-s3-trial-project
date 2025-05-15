
"use server"

/**
 * Represents an image object stored in S3 or a similar storage service.
 * 
 * @property {string} key - The unique key or identifier for the image in the storage bucket.
 * @property {string} url - The direct URL to access the image.
 * @property {string} [lastModified] - The ISO string representing the last modification date of the image (optional).
 * @property {string} [name] - The display name or original filename of the image (optional).
 * @property {string} [thumbnailUrl] - The URL for a thumbnail version of the image (optional).
 * @property {string} [imageUrl] - An alternate or processed image URL (optional).
 */
export interface S3Image {
  key: string
  url: string
  lastModified?: string
  name?: string
  thumbnailUrl?: string
  imageUrl?: string
}

import { GET_API_URL } from "../constants/api"

/**
 * Fetches a list of images from the configured API endpoint.
 * 
 * This function sends a GET request to the API endpoint defined by `GET_API_URL`
 * and expects an array of objects conforming to the `S3Image` interface.
 * 
 * @async
 * @returns {Promise<S3Image[]>} A promise that resolves to an array of S3Image objects.
 * If the request fails or an error occurs, it returns an empty array.
 * 
 * @example
 * const images = await listImages();
 * images.forEach(img => console.log(img.url));
 */
export async function listImages(): Promise<S3Image[]> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(GET_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization headers if needed
      },
      // credentials: "include", // Uncomment if cookies/session needed
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    // Assuming the server returns an array of objects matching S3Image
    const images: S3Image[] = await response.json();

    // Optionally, validate/transform the data here if needed
    return images;
  } catch (error) {
    console.error("Error listing images:", error);
    return [];
  }
}
