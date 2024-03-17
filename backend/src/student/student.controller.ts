import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDTO } from './student.schema';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAll() {
    return this.studentService.findAll();
  }

  @Post()
  async create(@Body() createStudentDTO: StudentDTO) {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(createStudentDTO.DOB).getFullYear();

    if (currentYear - birthYear < 10)
      return {
        statusCode: 400,
        message: ['Student must be at-least 10 years of age'],
        error: 'Bad Request',
      };
    return this.studentService.create(createStudentDTO).catch((err) => {
      return err;
    });
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string) {
    return this.studentService.delete(id).catch((err) => {
      return err;
    });
  }
}
