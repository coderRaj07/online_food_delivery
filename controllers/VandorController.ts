import { Request, Response, NextFunction } from "express";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { EditVandorInput } from "../dto"; // Import the missing type

// Vandor Logins and Signature gets Genarated
export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingVandor = await FindVandor(undefined, email);
    if (!existingVandor) {
        return res.status(404).json({ message: "Vandor Not Found" });
    }
    const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);
    if (validation) {
        const signature = GenerateSignature({
            _id: existingVandor._id,
            email: existingVandor.email,
            foodTypes: existingVandor.foodType,
            name: existingVandor.name,
        });
        return res.json(signature)
    }
    else {
        return res.status(401).json({ message: "Invalid Password" })
    }
}

// Signature is validated, req.user is created by Authenticate() from Middleware 
// that uses ValidateSignature() from Password utility 
// and then we use req.user here
export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        return res.json(existingVandor)
    }
    return res.status(404).json({ message: "Vandor Info Not Found" });
}

// Uses Patch method
export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {foodTypes, name, address, phone} = <EditVandorInput>req.body;
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        if(existingVandor){
            existingVandor.foodType = foodTypes;
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.phone = phone;
            await existingVandor.save();
            return res.json(existingVandor);
        }
    }
    return res.status(404).json({ message: "Vandor Info Not Found" });
}


export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
   
    const user = req.user;
    if (user) {
        const existingVandor = await FindVandor(user._id);
        if(existingVandor){
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            await existingVandor.save();
            return res.json(existingVandor);
        }
    }
    return res.status(404).json({ message: "Vandor Info Not Found" });
}