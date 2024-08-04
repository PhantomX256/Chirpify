// This middleware checks if the apikey is correct
const checkApiKey = (req, res, next) => {
    // Get the apikey from headers
    const apiKey = req.headers["x-api-key"];

    // Get the valid api key
    const validApiKey = process.env.API_KEY;

    // Check if the apikey was passed
    if (!apiKey) return res.status(401).json({ error: "API key is missing" });

    // Check if the apikey is valid
    if (apiKey !== validApiKey) return res.status(403).json({ error: 'Invalid API Key' });

    next();
};

export default checkApiKey;