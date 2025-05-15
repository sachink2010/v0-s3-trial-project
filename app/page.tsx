import { UploadForm } from "./components/upload-form"
// import { ImageGallery } from "./components/image-gallery"


/**
 * Home Page Component
 *
 * The main entry point for the S3 Image Uploader application.
 *
 * Features:
 * - Displays the application title.
 * - Renders the UploadForm component for uploading images to S3.
 * - (Optional) Can render the ImageGallery component to display uploaded images.
 *
 * Usage:
 * This component is used as the root page for the application and is rendered at the "/" route.
 *
 * Example:
 * ```tsx
 * import Home from "./page"
 * // <Home />
 * ```
 */
export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center" style={{color:' #3b82f6'}}>S3 Image Uploader</h1>
      <UploadForm />
    </main>
  )
}
