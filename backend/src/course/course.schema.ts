import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, MinLength } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
export class CourseDTO {
  @IsNotEmpty({
    message: 'Course Name is required',
  })
  @MinLength(3, {
    message: 'Course Name must at-least have 3 characters',
  })
  name: string;
}
