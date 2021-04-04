import { getRepository } from 'typeorm';
import { response, Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateOccurenceTypeService from "../services/createOccurenceTypeService";
import OccurenceType from '../models/OccurenceType';

const occurrenceTypeRouter = Router();

occurrenceTypeRouter.use(ensureAuthenticated);

occurrenceTypeRouter.post('/', async (request, response) => {
    const {description} = request.body;

    const createOccurenceType = new CreateOccurenceTypeService();
    const occurenceType = await createOccurenceType.execute({description});

    return response.json(occurenceType);
})

occurrenceTypeRouter.get('/', async (request, response) => {
    const occurenceTypeRepository = getRepository(OccurenceType);

    const occurenceTypes = await occurenceTypeRepository.find();

    return response.json(occurenceTypes);
})

export default occurrenceTypeRouter;