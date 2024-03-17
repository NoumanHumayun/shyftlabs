import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {  IsDateString, IsEmail, IsNotEmpty, MinLength,  } from 'class-validator';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  familyName: string;

  @Prop({ required: true })
  DOB: Date;

  @Prop({ required: true })
  email: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

export class StudentDTO {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'First Name must have at-least 3 characters',
  })
  firstName: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'Family Name must have at-least 3 characters',
  })
  familyName: string;

  @IsDateString()
  @IsNotEmpty()
  DOB: Date;
}
