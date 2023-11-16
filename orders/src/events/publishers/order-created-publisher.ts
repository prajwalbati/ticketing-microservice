import { Publisher, OrderCreatedEvent, Subjects } from "@satik-tickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}