import { getRepository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import BikeType from "../models/BikeType";

interface Request 
{
    description: string;
}


class CreateBikeTypeService 
{
    public async execute({description}:Request):Promise<BikeType> 
    {
        const bikeTypeRepository = getRepository(BikeType);

        const bikeType = bikeTypeRepository.create({id: uuidv4(), description});

        await bikeTypeRepository.save(bikeType);

        return bikeType;

    }
}

export default CreateBikeTypeService;