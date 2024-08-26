export interface TaskType {
  id: number;
  title: string;
  status: boolean;
  groupId: number;
  description?: string;
  dueDate?: Date;
  dueTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}
