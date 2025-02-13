import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // This makes TaskRepository available
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService], // Exporting TaskService if needed elsewhere
})
export class TaskModule {}
