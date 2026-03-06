import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VehicleSize } from '../enums/vehicle-size.enum';
import { VehicleType } from '../enums/vehicle-type.enum';

export class EnterVehicleDto {
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsEnum(VehicleType)
  type: VehicleType;

  @IsEnum(VehicleSize)
  size: VehicleSize;
}
