import express, { Request, Response, NextFunction } from 'express';
import { CreateVandor } from '../controllers';

const router = express.Router();


router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello From Vandor" });
})


export { router as VandorRoute };