import express from "express";
import fetch from "node-fetch";
const router = express.Router();

router.post('/', async (req, res) => {
    try {
  const { url, method = "GET", body, headers = {}, params = {} } = req.body;

  let target;
  // validate URL
  try {
    target = new URL(url);
  }
  catch (err) {
    return res.status(400).json( { message: "Invalid URl" } )
  }

  for(const [key, value] of Object.entries(params)) {
    if(value !== undefined && value !== null) {
        target.searchParams.set(key, String(value));
    }
  }

  const properHeaders = body ? { "Content-Type": "application/json", ...headers } : headers;

  const response = await fetch(target.toString(), {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: properHeaders
  })

  const data = await response.text();
  let parsed;
  try { parsed = JSON.parse(data) } catch { parsed = data }

  res.json({
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    body: parsed
  })
  }
  catch (err) {
    res.status(500).json({ message: "Internal server error" })
  }
  
});

export default router;
