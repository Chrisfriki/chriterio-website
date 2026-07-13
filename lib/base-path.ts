// GitHub Pages serves this site from /chriterio-website/, while localhost and
// Vercel serve it from /. next.config.mjs injects NEXT_PUBLIC_BASE_PATH at
// build time; use this for any asset path that doesn't go through
// next/image's built-in optimizer (plain <img> tags, canvas Image() sources,
// next/image with `unoptimized: true`, etc.), since those don't get the
// basePath prefix automatically.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`
}
