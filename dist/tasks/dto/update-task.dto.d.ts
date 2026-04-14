declare const TaskStatus: readonly ["pending", "in-progress", "done"];
type TaskStatus = (typeof TaskStatus)[number];
export declare class UpdateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
}
export {};
