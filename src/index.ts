/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from 'mongoose';
import { router as characterRouter } from "./character/router";
import { router as userRouter } from "./user/router";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/character", characterRouter);
app.use("/api/user", userRouter);
// Connection URI 
const MONGODB_URI = process.env.MONGODB_URI as string;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});


/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
  