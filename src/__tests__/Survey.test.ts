import request from 'supertest';
import { app } from '../app';	
import createConnection from '../database'; 

describe("Surveys", async () => {
	beforeAll( async() => {
	    jest.setTimeout(10000);
		const connection = await createConnection();
		await connection.runMigrations();
	});

	it("Should be able to create a new survey", async () => {
		const response = await request(app).post("/surveys")
		.send({
			title: "survey test",
			description: "description test" 
		});

		expect(response.status).toBe(201);
	    expect(response.body).toHaveProperty("id");

	});

	it("Should be able to get all surveys", async () => {
		await request(app).post("/surveys")
		.send({
			title: "survey test",
			description: "description test" 
		});

		const response = await request(app).get("/surveys")
		console.log(response.body);
		expect(response.body.length).toBe(2);

	});

}); 