import {Router} from "express";
import { getCredential } from "../controller/Auth.controller";

const router = Router();

router.post("/", getCredential);

export default router;