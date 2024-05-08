import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
    env: {
        API_ROOT: isProduction ? 'https://trello-official-api.onrender.com' : 'http://localhost:8024'
    }
};

export default withNextIntl(nextConfig);
