import { Subjects, Publisher, PaymentCreatedEvent } from "@satik-tickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

    
}