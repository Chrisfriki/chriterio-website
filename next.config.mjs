const isGithubPages = process.env.GITHUB_PAGES === "true"
const repoName = "chriterio-website"

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(isGithubPages && {
    output: "export",
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
}

export default nextConfig
