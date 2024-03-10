import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from 'src/db/entities/lesson.entity';
import { StudentModule } from '../student/student.module';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), StudentModule],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
