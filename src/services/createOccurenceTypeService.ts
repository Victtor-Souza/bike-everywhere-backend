import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import OccurenceType from '../models/OccurenceType';

interface Request {
    description: string;
}


class CreateOccurenceTypeService {
    public async execute({description}: Request):Promise<OccurenceType> {
        const occurenceTypeRepository = getRepository(OccurenceType);

        const occurenceType = occurenceTypeRepository.create({id: uuidv4(), description});

        await occurenceTypeRepository.save(occurenceType);

        return occurenceType;

    }
}

export default CreateOccurenceTypeService;


