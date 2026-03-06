import { Injectable } from '@nestjs/common';
import { Vehicle } from '../interfaces/vehicle.interface';
import { Ticket } from '../models/ticket.model';
import { FareCalculatorService } from './fare-calculator.service';
import { ParkingManagerService } from './parking-manager.service';

@Injectable()
export class ParkingLotService {
  constructor(
    private readonly parkingManagerService: ParkingManagerService,
    private readonly fareCalculatorService: FareCalculatorService,
  ) {}

  enterVehicle(vehicle: Vehicle): Ticket | null {
    const spot = this.parkingManagerService.parkVehicle(vehicle);

    if (!spot) {
      return null;
    }

    return new Ticket(this.generateTicketId(), vehicle, spot, new Date());
  }

  leaveVehicle(ticket: Ticket): { ticket: Ticket; fare: number } | null {
    if (ticket.exitTime) {
      return null;
    }

    ticket.setExitTime(new Date());
    this.parkingManagerService.unparkVehicle(ticket.vehicle);

    const fare = this.fareCalculatorService.calculateFare(ticket);

    return {
      ticket,
      fare,
    };
  }

  private generateTicketId(): string {
    return `TICKET-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
}
