import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/db/entities/student.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRopository: Repository<StudentEntity>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    const student = this.studentRopository.create({
      id: uuid(),
      ...createStudentInput,
    });

    return this.studentRopository.save(student);
  }

  async getStudents(): Promise<StudentEntity[]> {
    return this.studentRopository.find();
  }

  async getSudentById(id: string): Promise<StudentEntity> {
    return this.studentRopository.findOneBy({ id });
  }
}
