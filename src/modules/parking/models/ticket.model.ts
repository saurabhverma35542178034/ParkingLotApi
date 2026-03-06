import { ParkingSpot } from '../interfaces/parking-spot.interface';
import { Vehicle } from '../interfaces/vehicle.interface';

export class Ticket {
  public exitTime: Date | null = null;

  constructor(
    public ticketId: string,
    public vehicle: Vehicle,
    public parkingSpot: ParkingSpot,
    public entryTime: Date,
  ) {}

  setExitTime(exitTime: Date): void {
    this.exitTime = exitTime;
  }

  calculateParkingDurationInMinutes(): number {
    const endTime = this.exitTime || new Date();
    const diffInMs = endTime.getTime() - this.entryTime.getTime();

    return Math.ceil(diffInMs / (1000 * 60));
  }
}
