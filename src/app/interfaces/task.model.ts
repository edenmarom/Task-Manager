export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export type NewTask = Partial<Omit<Task, '_id'>>;
