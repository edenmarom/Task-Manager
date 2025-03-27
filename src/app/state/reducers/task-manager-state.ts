import { Task } from '../../interfaces/task.model';
import { User } from '../../interfaces/user.model';

export interface TaskManagerState {
  tasks: ReadonlyArray<Task>;
  user: User;
}