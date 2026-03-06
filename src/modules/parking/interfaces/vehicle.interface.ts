import { VehicleSize } from '../enums/vehicle-size.enum';
import { VehicleType } from '../enums/vehicle-type.enum';

export interface Vehicle {
  licensePlate: string;
  type: VehicleType;
  size: VehicleSize;
}
