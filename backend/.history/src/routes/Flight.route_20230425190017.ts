import { Router } from "express";

import { getCredential, searchAirport } from "../controllers/Flight.controller";

const router = Router();

router.post("/auth", getCredential);
router.post("/autocomplete", searchAirport);

export default router;