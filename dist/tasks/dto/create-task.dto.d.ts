declare const TaskStatus: readonly ["pending", "in-progress", "done"];
type TaskStatus = (typeof TaskStatus)[number];
export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
}
export {};
