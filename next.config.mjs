const isGithubPages = process.env.GITHUB_PAGES === "true"
const repoName = "chriterio-website"
const basePath = isGithubPages ? `/${repoName}` : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Exposed to client code so hand-built asset URLs (e.g. the canvas frame
  // sequence, which can't go through next/image) can prefix themselves
  // correctly both on localhost ("") and on GitHub Pages ("/chriterio-website").
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages && {
    output: "export",
    basePath,
    assetPrefix: `${basePath}/`,
  }),
}

export default nextConfig
