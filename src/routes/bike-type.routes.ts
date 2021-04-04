import { getRepository } from 'typeorm';
import { Router } from "express";
import BikeType from '../models/BikeType';
import CreateBikeTypeService from '../services/createBikeTypeService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';


const bikeTypeRouter = Router();
bikeTypeRouter.use(ensureAuthenticated);

bikeTypeRouter.get('/', async (request, response) => {
    const bikeTypeRepository = getRepository(BikeType);

    const bikeTypes = await bikeTypeRepository.find();

    return response.json(bikeTypes);
});



bikeTypeRouter.post('/', async (request, response) => {
    const {description} = request.body;

    const bikeTypeService = new CreateBikeTypeService();
    const bikeType = await bikeTypeService.execute({description});


    return response.json(bikeType);
});

export default bikeTypeRouter;

