import request from "supertest";
import { app } from "../../app";

it('responds with details about the current user', async() => {
    let signUpResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    let cookieDetails = signUpResponse.get('Set-Cookie');

    let response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookieDetails)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});