import { Task } from '../task.entity';

export class TasksResponseDto {
  tasks: Task[];
  totalCount: number;
}
