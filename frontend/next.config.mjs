import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The backend and the frontend each have their own package-lock.json.
  // This tells next that the frontend folder is the project root,
  // otherwise it guesses and warns.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
