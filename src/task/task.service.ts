import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createtask.dto';
import { UpdateTaskDto } from './dto/updatetask.dto';
import { TaskPriority, TaskStatus } from 'src/common/enums';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
        where: {id}
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    Object.assign(task, updateTaskDto);  // Update fields based on the DTO
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({
        where: {id}
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.remove(task);
  }

  async getTasks(
    page: number = 1,
    limit: number = 10,
    status: TaskStatus | null = null,
    priority: TaskPriority | null = null,
  ): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (priority) {
      queryBuilder.andWhere('task.priority = :priority', { priority });
    }

    queryBuilder.skip((page - 1) * limit).take(limit).orderBy('task.dateOfCreation', 'DESC');
    return queryBuilder.getMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
        where: {id}
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }
}
