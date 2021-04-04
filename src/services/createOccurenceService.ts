import { v4 as uuidv4 } from 'uuid';
import { getRepository } from 'typeorm';
import Occurrence from "../models/Occurence";
import Address from '../models/Address';


interface Request 
{
    ocurence_type_id:string,
    bike_id:string,
    datetime:Date,
    description:string,
    address: 
        {
            number:string,
            route:string,
            sublocality:string,
            locality:string,
            state:string,
            country:string,
            latitude: number,
            longitute: number
        }
}


class CreateOccurenceService 
{
    public async execute({ocurence_type_id, bike_id,datetime,description,address}: Request):Promise<Occurrence>
    {
        const occurenceRepository = getRepository(Occurrence);
        const addressRepository = getRepository(Address);

        const new_address = addressRepository.create({
            id: uuidv4(),
            number: address.number,
            route: address.route,
            sublocality: address.sublocality,
            locality: address.locality,
            state: address.state,
            country: address.country,
            latitude: address.latitude,
            longitude: address.longitute
        });
        await addressRepository.save(new_address);

        const occurrence = occurenceRepository.create({
            id:uuidv4(),
            ocurence_type_id,
            bike_id,
            datetime,
            description,
            address_id: new_address.id,
            address: new_address
        });

        await occurenceRepository.save(occurrence);

        return occurrence;
    }

}

export default CreateOccurenceService;