import { IsString, IsDateString, IsEnum, IsBoolean } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../common/enums';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsBoolean()
  isActive: boolean;
}
