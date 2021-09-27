import { Router } from "express"
import productRoutes from "./products";

const routes = Router();

routes.use("/product", productRoutes)

export default routes;