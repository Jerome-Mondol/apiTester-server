import fetch from 'node-fetch'
import validateUrl from '../utils/validateUrl.js'
import addParams from '../utils/addParams.js';

const handleProxy = async (req, res) => {
    try {
        const { url, method = "GET", body = {}, headers = {}, params = {} } = req.body; 
        const validatedURL = validateUrl(url);
        const URLWithAddedParams = addParams(validatedURL, params);

        const methodsWithBody = ["POST", "PUT", "PATCH", "DELETE"];

        const properHeaders = body ? { "Content-Type": "application/json", ...headers } : headers;

        const response = await fetch(URLWithAddedParams, {
            method,
            body: body && methodsWithBody.includes(method.toUpperCase()) ? JSON.stringify(body) : undefined,
            headers: properHeaders,
        })

        const text = await response.text();
        let parsed;
        try { parsed = JSON.parse(text); } catch { parsed = text; }

        res.send(parsed);
    }

    catch(err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default handleProxy;
