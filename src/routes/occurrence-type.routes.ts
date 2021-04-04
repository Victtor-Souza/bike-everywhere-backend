import { Router } from "express";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CreateOccurenceTypeService from "../services/createOccurenceTypeService";

const occurrenceTypeRouter = Router();

occurrenceTypeRouter.use(ensureAuthenticated);

occurrenceTypeRouter.post('/', async (request, response) => {
    const {description} = request.body;

    const createOccurenceType = new CreateOccurenceTypeService();
    const occurenceType = await createOccurenceType.execute({description});

    return response.json(occurenceType);

    
})

export default occurrenceTypeRouter;