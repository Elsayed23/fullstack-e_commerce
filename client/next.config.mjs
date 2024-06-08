/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'elsayed23.github.io']
    },
    env: {
        API_BASE_URL: 'https://full-stack-e-commerce-goiy.onrender.com/api/v1',
        DATABASE_URL: "mysql://root:elsayed@localhost:3306/test"
    }
};

export default nextConfig;
