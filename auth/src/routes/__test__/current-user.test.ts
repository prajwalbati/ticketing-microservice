import request from "supertest";
import { app } from "../../app";

it('responds with details about the current user', async() => {
    let cookie = await global.signin();

    let response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async() => {
    let response = await request(app)
        .get('/api/users/currentuser')
        .send();

    expect(response.body.currentUser).toEqual(undefined);
});