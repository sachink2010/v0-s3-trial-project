import { NextRequest, NextResponse } from "next/server";
import { UPLOAD_API_URL } from "../../constants/api"


/**
 * @fileoverview API route handler for file uploads.
 *
 * This route accepts file upload requests, processes the incoming file data,
 * and performs any necessary handling (such as saving to disk, cloud storage, or further processing).
 *
 * ## Expected Request
 * - Method: POST
 * - Content-Type: multipart/form-data or application/octet-stream (depending on implementation)
 * - Body: File data to be uploaded
 *
 * ## Response
 * - 200 OK: Upload successful, returns metadata or confirmation.
 * - 4xx/5xx: Error details if upload fails.
 *
 * ## Example Usage
 * ```bash
 * curl -X POST -F "file=@path/to/file" http://localhost:3000/api/upload
 * ```
 *
 * @module api/upload/route
 */

export const config = {
  api: {
    bodyParser: false, // Important: disables the default body parser to handle large files
  },
};

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    const fileName = req.headers.get("x-filename") || "upload.bin";
    const arrayBuffer = await req.arrayBuffer();

    // Here, you would forward the buffer to your external API or S3, etc.
    // Example: Forward to external API
    const response = await fetch(UPLOAD_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        "X-Filename": fileName,
      },
      body: Buffer.from(arrayBuffer),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: errorText }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}