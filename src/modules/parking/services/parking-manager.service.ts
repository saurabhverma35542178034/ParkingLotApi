import { Injectable } from '@nestjs/common';
import { VehicleSize } from '../enums/vehicle-size.enum';
import { ParkingSpot } from '../interfaces/parking-spot.interface';
import { Vehicle } from '../interfaces/vehicle.interface';
import { CompactSpot } from '../models/compact-spot.model';
import { OversizedSpot } from '../models/oversized-spot.model';
import { RegularSpot } from '../models/regular-spot.model';

@Injectable()
export class ParkingManagerService {
  private readonly availableSpots: Map<VehicleSize, ParkingSpot[]> = new Map();
  private readonly vehicleToSpotMap: Map<string, ParkingSpot> = new Map();

  constructor() {
    this.availableSpots.set(VehicleSize.SMALL, [
      new CompactSpot(1),
      new CompactSpot(2),
    ]);

    this.availableSpots.set(VehicleSize.MEDIUM, [
      new RegularSpot(101),
      new RegularSpot(102),
    ]);

    this.availableSpots.set(VehicleSize.LARGE, [
      new OversizedSpot(201),
      new OversizedSpot(202),
    ]);
  }

  findSpotForVehicle(vehicle: Vehicle): ParkingSpot | null {
    const vehicleSize = vehicle.size;

    if (vehicleSize === VehicleSize.SMALL) {
      return this.findFirstAvailableSpot([
        VehicleSize.SMALL,
        VehicleSize.MEDIUM,
        VehicleSize.LARGE,
      ]);
    }

    if (vehicleSize === VehicleSize.MEDIUM) {
      return this.findFirstAvailableSpot([
        VehicleSize.MEDIUM,
        VehicleSize.LARGE,
      ]);
    }

    return this.findFirstAvailableSpot([VehicleSize.LARGE]);
  }

  parkVehicle(vehicle: Vehicle): ParkingSpot | null {
    const spot = this.findSpotForVehicle(vehicle);

    if (!spot) {
      return null;
    }

    spot.occupy(vehicle);
    this.vehicleToSpotMap.set(vehicle.licensePlate, spot);

    return spot;
  }

  unparkVehicle(vehicle: Vehicle): void {
    const spot = this.vehicleToSpotMap.get(vehicle.licensePlate);

    if (!spot) {
      return;
    }

    spot.vacate();
    this.vehicleToSpotMap.delete(vehicle.licensePlate);
  }

  private findFirstAvailableSpot(sizes: VehicleSize[]): ParkingSpot | null {
    for (const size of sizes) {
      const spots = this.availableSpots.get(size) || [];

      for (const spot of spots) {
        if (spot.isAvailable()) {
          return spot;
        }
      }
    }

    return null;
  }
}
