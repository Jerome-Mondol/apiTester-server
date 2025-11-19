import express from "express";
const router = express.Router();


router.get('/', (req, res) => {
    res.send(
        { 
            ok: true,
            time: new Date().toISOString() 
        }
    )
})

export default router;