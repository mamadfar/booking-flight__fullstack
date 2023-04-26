import { Router } from "express";

import { searchAirport } from "../controllers/Flight.controller";

const router = Router();

router.post("/", searchAirport);

export default router;