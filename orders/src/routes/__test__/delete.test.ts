import request from 'supertest';

import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '@satik-tickets/common';
import { Order } from '../../models/order';

it('marks an order as cancelled', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    const user = global.signin();
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    const deletedOrder = await Order.findById(order.id);

    expect(deletedOrder!.status).toEqual(OrderStatus.Cancelled);
});