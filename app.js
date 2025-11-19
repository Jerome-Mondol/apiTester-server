import express from "express";
import cors from 'cors';
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.send({ ok: true, time: new Date().toISOString() })
})

app.post('/api/proxy', async (req, res) => {
    const { url, method = "GET", headers = {}, body } = req.body;

    try {
        const response = await fetch(url, {
            method, 
            headers,
            body: body ? JSON.stringify(body) : undefined
        })

        const text = await response.text();
        let parsed;
        try { parsed = JSON.parse(text) } catch { parsed = text }

        res.json({
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            body: parsed
        })
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

app.listen(5500, () => console.log("Server running."))