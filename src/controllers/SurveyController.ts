import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController {
  
  async create(resquest: Request, response: Response) {

	const { title, description} = resquest.body;
	console.log(resquest.body);
	const surveysRepository = getCustomRepository(SurveysRepository);
	const survey = surveysRepository.create({ title, description });
	await surveysRepository.save(survey);
	return response.status(201).json(survey);

  }

  async show(resquest: Request, response: Response) {

  	const surveysRepository = getCustomRepository(SurveysRepository);
  	const all = await surveysRepository.find();
  	return  response.json(all);
  
  }  
  
}

export { SurveyController };