import { Ticket } from '../models/ticket.model';
import { FareStrategy } from './fare-strategy.interface';

export class PeakHoursFareStrategy implements FareStrategy {
  private readonly PEAK_MULTIPLIER = 1.5;

  calculateFare(ticket: Ticket, currentFare: number): number {
    const entryHour = ticket.entryTime.getHours();

    const isPeakHour =
      (entryHour >= 7 && entryHour <= 10) ||
      (entryHour >= 16 && entryHour <= 19);

    if (isPeakHour) {
      return currentFare * this.PEAK_MULTIPLIER;
    }

    return currentFare;
  }
}
