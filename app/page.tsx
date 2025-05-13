import { UploadForm } from "./components/upload-form"
import { ImageGallery } from "./components/image-gallery"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">S3 Image Uploader</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <UploadForm />
        </div>
        <div>
          <ImageGallery />
        </div>
      </div>
    </main>
  )
}
