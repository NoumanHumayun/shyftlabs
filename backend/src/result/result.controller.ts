import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultDTO } from './result.schema';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  async getAll() {
    return this.resultService.findAll();
  }

  @Post()
  async create(@Body() createResultDTO: ResultDTO) {
    return this.resultService.create(createResultDTO).catch(err => {
        return err;
    });
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    return this.resultService.delete(id);
  }
}
