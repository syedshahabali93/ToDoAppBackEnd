import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createtask.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from './task.entity';
import { UpdateTaskDto } from './dto/updatetask.dto';
import { TaskPriority, TaskStatus } from 'src/common/enums';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'Task has been created',
    type: Task,
  })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: Task,
  })
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get tasks with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: Task,
    isArray: true,
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status: TaskStatus | null = null,
    @Query('priority') priority: TaskPriority | null = null,
  ): Promise<Task[]> {
    return this.taskService.getTasks(page, limit, status, priority);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one task by ID' })
  @ApiResponse({ status: 200, description: 'Task details', type: Task })
  async findOne(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
}
