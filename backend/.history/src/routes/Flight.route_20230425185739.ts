import { Router } from "express";

import { searchAirport } from "../controllers/Flight.controller";

const router = Router();

router.post("/", searchAirport);
router.get("/autocomplete", (req, res) => {
    res.json("ok")
})

export default router;