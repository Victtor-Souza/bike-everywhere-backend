import { getRepository } from 'typeorm';
import moment from 'moment';
import { Router } from "express";
import CreateOccurenceService from "../services/createOccurenceService";
import Occurrence from '../models/Occurence';
import CalculateDistanceByRadius from '../utils/CalculateDistanceByRadius';
import AppError from '../errors/AppError';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const occurrencesRouter = Router();
occurrencesRouter.use(ensureAuthenticated);

occurrencesRouter.post('/', async(request, response) => {
    const {ocurence_type_id, bike_id, datetime, description, address} = request.body;
    
    const createOccurence = new CreateOccurenceService();

    const occurence = await createOccurence.execute({ocurence_type_id, bike_id, datetime, description, address});

    return response.json(occurence)

});

occurrencesRouter.get('/', async(request, response) => {
   
    const {lat, long, radius, days} = request.query;
    const occurenceRepository = getRepository(Occurrence);
    const today = moment().format('YYYY-MM-DD');

    let params = ``;

    if (days !== undefined) params += `CAST("Occurrence"."datetime" as date) BETWEEN '${moment(today).subtract(days, 'days').format('YYYY-MM-DD')}' AND '${today}'`;
   
    const occurences = await occurenceRepository.find({where: params, order: {datetime: 'DESC'}, relations: ['address', 'bike', 'bike.user']})

    const occurencesByRadius = radius !== undefined ? occurences.filter(o => CalculateDistanceByRadius(lat, long, o.address.latitude, o.address.longitude) <= radius) : occurences;
    
    return response.json(occurencesByRadius);
})

occurrencesRouter.get('/:userId', async(request, response) => {
    const {userId} = request.params;
    const occurenceRepository = getRepository(Occurrence);

    console.log(request.user)
    if (userId !== request.user.id) throw new AppError("Unauthorized action", 400);

    const occurences = await occurenceRepository.find({where:`"Occurrence__bike"."user_id" = '${userId}'`, relations: ['address', 'bike', 'bike.user']})

    return response.json(occurences);
})
export default occurrencesRouter;