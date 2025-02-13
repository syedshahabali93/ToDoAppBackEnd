import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus, TaskPriority } from '../../common/enums';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;
}
