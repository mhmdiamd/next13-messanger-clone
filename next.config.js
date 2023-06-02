/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental :{
    swcPlugins: [
      ["next-superjson-plugin", {}]
    ]
  },
  images: {
    domains : [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ]
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],

}

module.exports = nextConfig
