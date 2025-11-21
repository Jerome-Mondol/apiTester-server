import express from "express";
import cors from 'cors';
import healthRoute from './routes/health.routes.js';
import proxyRoute from './routes/proxy.routes.js'
import jwtRoute from './routes/jwt.routes.js'

const app = express();

app.use(cors());
app.use(express.json());

// Routes 
app.use('/health', healthRoute);
app.use('/api/proxy', proxyRoute);
app.use('/token', jwtRoute);



app.listen(5500, () => console.log("Server running."))