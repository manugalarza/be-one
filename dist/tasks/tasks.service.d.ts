import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export type TaskStatus = 'pending' | 'in-progress' | 'done';
export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}
export declare class TasksService {
    private tasks;
    private nextId;
    findAll(): Task[];
    findOne(id: number): Task;
    create(dto: CreateTaskDto): Task;
    update(id: number, dto: UpdateTaskDto): Task;
    remove(id: number): Task;
}
