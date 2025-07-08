// packages
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

// connections
import connectUserDB from "./connections/userDB";

// middleware
import { authenticated } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";

// routes
import authRouter from "./routes/authRouter";
import roleRouter from "./routes/roleRouter";
import userRouter from "./routes/userRouter";

dotenv.config();

export interface UserBasicInfo {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserBasicInfo | null;
        }
    }
}

const app = express();
const port = parseInt(process.env.PORT || "3000");

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//
//
// [server start test]
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//
//
// ----------------------------------------------------[routing]----------------------------------------------------
//Auth
app.use("/auth", authRouter);

//User
app.use("/users", authenticated, userRouter);

//Role
app.use("/roles", roleRouter);

//
//
// [error handling]
app.use(errorHandler);

//
//
// [database connection]
connectUserDB();
