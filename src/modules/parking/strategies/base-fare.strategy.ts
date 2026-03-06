import { VehicleSize } from '../enums/vehicle-size.enum';
import { Ticket } from '../models/ticket.model';
import { FareStrategy } from './fare-strategy.interface';

export class BaseFareStrategy implements FareStrategy {
  private readonly SMALL_RATE = 10;
  private readonly MEDIUM_RATE = 20;
  private readonly LARGE_RATE = 30;

  calculateFare(ticket: Ticket, currentFare: number): number {
    let rate = this.SMALL_RATE;

    switch (ticket.vehicle.size) {
      case VehicleSize.MEDIUM:
        rate = this.MEDIUM_RATE;
        break;
      case VehicleSize.LARGE:
        rate = this.LARGE_RATE;
        break;
      default:
        rate = this.SMALL_RATE;
    }

    const duration = ticket.calculateParkingDurationInMinutes();
    return currentFare + rate * duration;
  }
}
