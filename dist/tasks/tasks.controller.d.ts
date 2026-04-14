import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    findAll(): import("./tasks.service").Task[];
    findOne(id: number): import("./tasks.service").Task;
    create(createTaskDto: CreateTaskDto): import("./tasks.service").Task;
    update(id: number, updateTaskDto: UpdateTaskDto): import("./tasks.service").Task;
    remove(id: number): import("./tasks.service").Task;
}
