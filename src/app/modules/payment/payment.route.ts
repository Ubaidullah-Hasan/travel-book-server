import { Router } from "express";
import { paymentControler } from "./payment.controller";

const route = Router();

route.post("/", 
    paymentControler.confirmationController
)

export const paymentRoutes = route;