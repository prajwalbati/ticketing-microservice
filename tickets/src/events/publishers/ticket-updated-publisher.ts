import { Publisher, Subjects, TicketUpdatedEvent } from '@satik-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}