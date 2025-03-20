export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  __v?: number;
}

export type NewTask = Partial<Omit<Task, '_id'>>;
