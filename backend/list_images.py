import os
import json
import boto3

BUCKET = os.environ["BUCKET_NAME"]
s3     = boto3.client("s3")

def handler(event, _context):
    # 1. List all full-size objects so we can grab their sizes and timestamps
    resp = s3.list_objects_v2(Bucket=BUCKET, Prefix="uploads/")
    items = []

    for obj in resp.get("Contents", []):
        full_key   = obj["Key"]
        name       = full_key.split("/", 1)[1]
        thumb_key  = f"thumbnails/{name}"
        size       = obj["Size"]                            # file size in bytes
        modified   = obj["LastModified"].isoformat()        # ISO timestamp

        # 2. Generate presigned URLs
        thumb_url = s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": BUCKET, "Key": thumb_key},
            ExpiresIn=3600
        )
        full_url = s3.generate_presigned_url(
            "get_object",
            Params={"Bucket": BUCKET, "Key": full_key},
            ExpiresIn=3600
        )

        items.append({
            "name": name,
            "size": size,
            "lastModified": modified,
            "thumbnailUrl": thumb_url,
            "imageUrl": full_url
        })

    # 3. Optional server-side sorting via ?sort=…&order=…
    qs       = event.get("queryStringParameters") or {}
    sort_key = qs.get("sort")            # e.g. "size", "name", "lastModified"
    order    = qs.get("order", "asc").lower()
    if sort_key in ("size", "name", "lastModified"):
        reverse = (order == "desc")
        items.sort(key=lambda x: x[sort_key], reverse=reverse)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps(items)
    }
