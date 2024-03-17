import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { ResultModule } from './result/result.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.mongoUrl),
    CourseModule,
    StudentModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
