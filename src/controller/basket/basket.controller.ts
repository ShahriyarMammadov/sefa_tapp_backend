import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBasketDto } from 'src/dto/basket.dto';
import { BasketService } from 'src/services/basket/basket.service';

@ApiTags('Basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  create(@Body() createBasketDto: CreateBasketDto) {
    return this.basketService.createBasket(createBasketDto);
  }

  @Get(':userId')
  @ApiResponse({
    status: 200,
    type: CreateBasketDto,
    isArray: true,
    description: 'List of baskets for the user',
  })
  async getBasket(@Param('userId') userId: string): Promise<CreateBasketDto[]> {
    return this.basketService.getBasketByUserId(userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a basket by ID' })
  @ApiResponse({
    status: 200,
    description: 'Basket has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Basket not found.' })
  async deleteBasket(@Param('id') basketId: string) {
    const result = await this.basketService.deleteBasket(basketId);
    return result;
  }
}
