import dotenv from 'dotenv'
import jwt from "jsonwebtoken";


dotenv.config();

export const handleJWT = (req, res) => {
    try {
        const { uid, email } = req.body;
        if(!uid || !email) return res.status(400).json({ message: "UID or email not provided" });

        const token = jwt.sign({ uid, email }, process.env.JWT_SECRET);
        
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
} 