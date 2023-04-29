import { Router } from "express";

import { getCredential, searchAirport, searchTicket } from "../controllers/Flight.controller";

const router = Router();

router.post("/auth", getCredential);
router.post("/autocomplete", searchAirport);
router.post("/search", searchTicket);

export default router;