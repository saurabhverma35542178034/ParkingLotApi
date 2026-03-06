import { Vehicle } from './vehicle.interface';
import { VehicleSize } from '../enums/vehicle-size.enum';

export interface ParkingSpot {
  spotNumber: number;
  size: VehicleSize;
  vehicle: Vehicle | null;

  isAvailable(): boolean;
  occupy(vehicle: Vehicle): void;
  vacate(): void;
}
