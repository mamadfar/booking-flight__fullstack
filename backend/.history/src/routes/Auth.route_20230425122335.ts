import {Router} from "express";
import { getCredential } from "../controller/Auth.controller";

const router = Router();

router.post("/auth", getCredential)

export default router;