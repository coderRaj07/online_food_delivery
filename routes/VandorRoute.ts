import express, { Request, Response, NextFunction } from 'express';
import { UpdateVandorProfile, GetVandorProfile, UpdateVandorService, VandorLogin } from '../controllers';
import { Authenticate } from '../middlewares/commonAuth';

const router = express.Router();

router.post("/login", VandorLogin)
router.get("/profile",Authenticate, GetVandorProfile)
router.patch("/profile",Authenticate, UpdateVandorProfile)
router.patch("/service",Authenticate, UpdateVandorService)

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello From Vandor" });
})


export { router as VandorRoute };