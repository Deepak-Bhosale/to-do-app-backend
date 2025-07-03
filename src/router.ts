import * as express from "express";
import { userRouter } from "./controllers/user";
import { listRouter } from "./controllers/lists";
import { cardRouter } from "./controllers/cards";

const router: express.Router = express.Router();

router.use("/user", userRouter);
router.use("/lists", listRouter);
router.use("/cards", cardRouter);

export default router;
