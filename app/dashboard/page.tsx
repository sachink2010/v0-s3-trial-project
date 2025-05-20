import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Upload and view your images",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Images</h1>
        <Button asChild>
          <Link href="/upload">Upload New Image</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 flex flex-col items-center justify-center h-64 bg-muted">
          <p className="text-muted-foreground">No images yet</p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/upload">Upload your first image</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
