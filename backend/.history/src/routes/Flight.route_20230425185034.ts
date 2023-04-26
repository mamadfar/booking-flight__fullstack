import { Router } from "express";

import { searchAirport } from "../controllers/Flight.controller";

const router = Router();

router.post("/autocomplete", searchAirport)

export default router;