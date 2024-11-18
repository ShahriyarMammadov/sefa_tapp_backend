import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchService } from 'src/services/search/search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('name')
  @ApiOperation({
    summary: 'Search Medicine, Pharmacy, Clinics and Doctor by name',
  })
  async searchByName(@Query('name') name: string) {
    if (!name) {
      return { message: 'Name parameter is required' };
    }

    const results = await this.searchService.searchByName(name);

    if (results.length === 0) {
      return { message: 'No results found' };
    }

    return results;
  }
}
