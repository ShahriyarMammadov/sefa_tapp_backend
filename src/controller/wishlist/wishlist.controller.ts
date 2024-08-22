import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { WishlistDto } from '../../dto/wishlist/create-wishlist.dto';
import { Wishlist } from '../../schema/wishlist';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async createWishlist(@Body() wishlistDto: WishlistDto): Promise<Wishlist> {
    return this.wishlistService.createWishlist(wishlistDto);
  }

  @Get(':userID')
  async getWishlistByUser(
    @Param('userID') userID: string,
  ): Promise<Wishlist[]> {
    return this.wishlistService.findWishlistByUser(userID);
  }

  @Delete(':id')
  async deleteWishlist(@Param('id') id: string): Promise<{ message: string }> {
    return this.wishlistService.deleteWishlistById(id);
  }
}
