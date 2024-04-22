import { Request, Response, NextFunction } from "express"
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";
//Admin Creates Vandor


export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, ownerName, phone, email, password } = <CreateVandorInput>req.body;
    const existingVandor = await Vandor.findOne({ email });

    if (existingVandor) {
        return res.status(400).json({ message: "Vandor already exists" });
    }

    // generate the salt
    const salt = await GenerateSalt();

    // encrypt the password with the salt
    const userPassword = await GeneratePassword(password, salt);


    const createVandor = await Vandor.create({
        name,
        address,
        pincode,
        foodType,
        ownerName,
        phone,
        email,
        password: userPassword,
        salt,
        serviceAvailable: false,
        coverImage: [],
        rating: 0,
    });

    return res.json(createVandor);
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Create Vandor" });
}

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Create Vandor" });
}