import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/db/entities/student.entity';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    const student = this.studentRepository.create({
      id: uuid(),
      ...createStudentInput,
    });

    return this.studentRepository.save(student);
  }

  async getStudents(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  async getSudentById(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOneBy({ id });
  }

  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    //In() not working in mongodb
    return await this.studentRepository.find({
      where: {
        id: In(studentIds),
      },
    });
  }
}
