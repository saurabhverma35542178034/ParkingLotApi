import { ParkingSpot } from '../interfaces/parking-spot.interface';
import { Vehicle } from '../interfaces/vehicle.interface';
import { VehicleSize } from '../enums/vehicle-size.enum';

export class RegularSpot implements ParkingSpot {
  vehicle: Vehicle | null = null;

  constructor(
    public spotNumber: number,
    public size: VehicleSize = VehicleSize.MEDIUM,
  ) {}

  isAvailable(): boolean {
    return this.vehicle === null;
  }

  occupy(vehicle: Vehicle): void {
    if (this.isAvailable()) {
      this.vehicle = vehicle;
    }
  }

  vacate(): void {
    this.vehicle = null;
  }
}
