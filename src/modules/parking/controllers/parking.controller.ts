import { Body, Controller, Post } from '@nestjs/common';
import { EnterVehicleDto } from '../dto/enter-vehicle.dto';
import { ParkingLotService } from '../services/parking-lot.service';

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingLotService: ParkingLotService) {}

  @Post('enter')
  enterVehicle(@Body() enterVehicleDto: EnterVehicleDto) {
    return this.parkingLotService.enterVehicle(enterVehicleDto);
  }
}
