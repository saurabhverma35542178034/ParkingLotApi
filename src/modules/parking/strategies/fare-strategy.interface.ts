import { Ticket } from '../models/ticket.model';

export interface FareStrategy {
  calculateFare(ticket: Ticket, currentFare: number): number;
}
