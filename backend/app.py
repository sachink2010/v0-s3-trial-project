import base64
import mimetypes
import os
from io import BytesIO
from urllib.parse import unquote
from PIL import Image
import boto3
from dotenv import load_dotenv

load_dotenv()
s3     = boto3.client("s3")
BUCKET = os.environ["BUCKET_NAME"]

def handler(event, _context):
    # 1. Decode the incoming body
    body = event.get("body", "") or ""
    data = (
        base64.b64decode(body)
        if event.get("isBase64Encoded")
        else body.encode()
    )

    # 2. Normalize headers
    headers = {k.lower(): v for k, v in event.get("headers", {}).items()}
    ctype   = headers.get("content-type", "application/octet-stream")

    # 3. Derive a safe filename
    filename_hdr = headers.get("x-filename")
    if filename_hdr:
        original = unquote(filename_hdr)
        name     = os.path.basename(original)
    else:
        ext  = mimetypes.guess_extension(ctype) or f".{ctype.split('/')[-1]}"
        name = f"{uuid.uuid4().hex}{ext}"

    # 4. Upload full-size image
    full_key = f"uploads/{name}"
    s3.put_object(
        Bucket=BUCKET,
        Key=full_key,
        Body=data,
        ContentType=ctype,
        ACL="private",
    )

    # 5. Generate & upload a 200×200 thumbnail
    try:
        img       = Image.open(BytesIO(data))
        img.thumbnail((200, 200))
        buf       = BytesIO()
        img_format = img.format or "JPEG"
        img.save(buf, format=img_format)
        buf.seek(0)

        thumb_key = f"thumbnails/{name}"
        s3.put_object(
            Bucket=BUCKET,
            Key=thumb_key,
            Body=buf.read(),
            ContentType=f"image/{img_format.lower()}",
            ACL="private",
        )
    except Exception:
        # Silently skip if Pillow can’t process it
        pass

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": f'{{"key":"{full_key}"}}'
    }
