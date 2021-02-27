import request from 'supertest';
import { app } from '../app';	
import createConnection from '../database'; 

describe("Users", async () => {
	beforeAll( async() => {
		const connection = await createConnection();
		await connection.runMigrations();
	});

	it("Should be able to create a new user", async () => {
		const response = await request(app).post("/users")
		.send({
			email: "test@mail.com",
			name: "user test" 
		});

		expect(response.status).toBe(201);
	});

	it("Should not be allowed create user if the mail exists", async () => {
		const response = await request(app).post("/users")
		.send({
			email: "test@mail.com",
			name: "user test" 
		});

		expect(response.status).toBe(400);
	});

}); 