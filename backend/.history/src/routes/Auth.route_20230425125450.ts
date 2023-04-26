import {Router} from "express";
import { getCredential } from "../controllers/Auth.controller";

const router = Router();

router.post("/", getCredential);

export default router;