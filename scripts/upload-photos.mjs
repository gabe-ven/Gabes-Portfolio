#!/usr/bin/env node
/**
 * Upload photos to Vercel Blob and update data/galleries.json.
 *
 * Usage:
 *   node scripts/upload-photos.mjs <location-id> <photos-folder>
 *
 * Example:
 *   node scripts/upload-photos.mjs sf ~/Desktop/sf-photos
 *   node scripts/upload-photos.mjs japan ./local-photos/japan
 *
 * Requirements:
 *   - BLOB_READ_WRITE_TOKEN env var (from Vercel dashboard → Storage → Blob → your store → .env.local)
 *   - Images should be compressed before uploading (JPEG ~1-3 MB each is ideal)
 *
 * Behavior:
 *   - Uploads each image to: photos/<location-id>/<filename>
 *   - Skips files already present in galleries.json for that location
 *   - Appends new items; never removes existing ones
 *   - Computes display height from image aspect ratio (used by the Masonry grid)
 */

import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";
import sizeOf from "image-size";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);


async function main() {
  const [locationId, rawFolder] = process.argv.slice(2);

  if (!locationId || !rawFolder) {
    console.error("Usage: node scripts/upload-photos.mjs <location-id> <photos-folder>");
    process.exit(1);
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error(
      "Missing BLOB_READ_WRITE_TOKEN.\n" +
      "Get it from: Vercel dashboard → Storage → Blob → your store → .env.local\n" +
      "Then run: BLOB_READ_WRITE_TOKEN=<token> node scripts/upload-photos.mjs ..."
    );
    process.exit(1);
  }

  const folder = path.resolve(rawFolder.replace(/^~/, process.env.HOME));
  if (!fs.existsSync(folder)) {
    console.error(`Folder not found: ${folder}`);
    process.exit(1);
  }

  const galleriesPath = path.resolve("data/galleries.json");
  const galleries = JSON.parse(fs.readFileSync(galleriesPath, "utf-8"));

  if (!galleries[locationId]) {
    console.error(
      `Unknown location "${locationId}". Add it to data/galleries.json first.\n` +
      `Known locations: ${Object.keys(galleries).join(", ")}`
    );
    process.exit(1);
  }

  const existingIds = new Set(galleries[locationId].items.map((i) => i.id));

  const files = fs
    .readdirSync(folder)
    .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log("No supported image files found in folder.");
    process.exit(0);
  }

  console.log(`\nUploading ${files.length} image(s) for "${locationId}"...\n`);

  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    const itemId = `${locationId}-${path.basename(file, path.extname(file))}`;

    if (existingIds.has(itemId)) {
      console.log(`  skip  ${file} (already in galleries.json)`);
      skipped++;
      continue;
    }

    const filePath = path.join(folder, file);
    const buffer = fs.readFileSync(filePath);
    const dims = sizeOf(buffer);

    if (!dims.width || !dims.height) {
      console.warn(`  warn  ${file} — could not read dimensions, skipping`);
      continue;
    }

    const blobPath = `photos/${locationId}/${file}`;
    process.stdout.write(`  upload  ${file} (${dims.width}×${dims.height}) → `);

    const { url } = await put(blobPath, buffer, {
      access: "public",
      contentType: `image/${path.extname(file).slice(1).replace("jpg", "jpeg")}`,
    });

    // EXIF orientations 5-8 mean the camera was rotated 90°/270° — swap w/h
    const rotated = dims.orientation >= 5 && dims.orientation <= 8;
    const naturalWidth  = rotated ? dims.height : dims.width;
    const naturalHeight = rotated ? dims.width  : dims.height;

    galleries[locationId].items.push({
      id: itemId,
      img: url,
      naturalWidth,
      naturalHeight,
    });

    console.log(url);
    uploaded++;
  }

  fs.writeFileSync(galleriesPath, JSON.stringify(galleries, null, 2) + "\n");

  console.log(`\nDone. ${uploaded} uploaded, ${skipped} skipped.`);
  console.log(`data/galleries.json updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
