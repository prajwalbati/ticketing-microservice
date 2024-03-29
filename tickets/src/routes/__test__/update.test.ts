import request from 'supertest';
import mongoose from 'mongoose';

import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../models/ticket';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'testtest',
            price: 20
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'testtest',
            price: 20
        })
        .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
    let ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'ticket name',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'updated name',
            price: 10
        })
        .expect(401);
});

it('returns 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();
    let ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'ticket name',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 10
        })
        .expect(400);


    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'updated ticket',
            price: -10
        })
        .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signin();
    let ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'ticket name',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'updated name',
            price: 10
        })
        .expect(200);

    let updatedTicket = await request(app).get(`/api/tickets/${ticket.body.id}`).send();

    expect(updatedTicket.body.title).toEqual('updated name');
    expect(updatedTicket.body.price).toEqual(10);
});

it('publishes an event', async () => {
    const cookie = global.signin();
    let ticket = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'ticket name',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${ticket.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'updated name',
            price: 10
        })
        .expect(200);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects updates if the ticket is reserved', async () => {
    const cookie = global.signin();
    let response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'ticket name',
            price: 20
        });

    const ticket = await Ticket.findById(response.body.id);
    ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
    await ticket!.save();

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'updated name',
            price: 10
        })
        .expect(400);
});