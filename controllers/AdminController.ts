import { Request, Response, NextFunction } from "express"
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";
//Admin Creates Vandor

export const FindVandor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vandor.findOne({ email });
    }
    else {
        return await Vandor.findById(id);
    }
}

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, ownerName, phone, email, password } = <CreateVandorInput>req.body;
    const existingVandor = await FindVandor(undefined, email);

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
    const vandors = await Vandor.find({});
    if (!vandors) {
        return res.status(404).json({ message: "No Vandors Found" });
    }
    return res.json(vandors);
}

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const vandor = await FindVandor(id);
    if (!vandor) {
        return res.status(404).json({ message: "No Vandor Found" });
    }
    return res.json(vandor);

}