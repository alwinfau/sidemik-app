const config = {
    api_url: import.meta.env.VITE_API_URL || '',
    auth_url: import.meta.env.VITE_AUTH_URL || '',
    token_expired: import.meta.env.VITE_TOKEN_EXPIRED || 0,
};

export default config;
