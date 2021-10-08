module.exports = {
    reactStrictMode: true,

    async redirects() {
        return [
            {
                source: '/',
                destination: '/events/featured',
                permanent: true,
            },
        ]
    },
}
