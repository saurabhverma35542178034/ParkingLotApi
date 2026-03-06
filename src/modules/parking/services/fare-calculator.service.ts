import { Injectable } from '@nestjs/common';
import { Ticket } from '../models/ticket.model';
import { FareStrategy } from '../strategies/fare-strategy.interface';
import { BaseFareStrategy } from '../strategies/base-fare.strategy';
import { PeakHoursFareStrategy } from '../strategies/peak-hours-fare.strategy';

@Injectable()
export class FareCalculatorService {
  private readonly fareStrategies: FareStrategy[];

  constructor() {
    this.fareStrategies = [new BaseFareStrategy(), new PeakHoursFareStrategy()];
  }

  calculateFare(ticket: Ticket): number {
    let fare = 0;

    for (const strategy of this.fareStrategies) {
      fare = strategy.calculateFare(ticket, fare);
    }

    return fare;
  }
}
