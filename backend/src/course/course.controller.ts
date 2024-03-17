import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDTO } from './course.schema';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAll() {
    return this.courseService.findAll();
  }

  @Post()
  async create(@Body() createCourseDTO: CourseDTO) {
    return this.courseService.create(createCourseDTO);
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
