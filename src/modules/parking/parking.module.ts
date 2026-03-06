import { Module } from '@nestjs/common';
import { ParkingController } from './controllers/parking.controller';
import { FareCalculatorService } from './services/fare-calculator.service';
import { ParkingLotService } from './services/parking-lot.service';
import { ParkingManagerService } from './services/parking-manager.service';

@Module({
  controllers: [ParkingController],
  providers: [ParkingLotService, ParkingManagerService, FareCalculatorService],
  exports: [ParkingLotService],
})
export class ParkingModule {}
