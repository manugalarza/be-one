"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [
            { id: 1, title: 'Design DB schema', description: 'Draw the ER diagram', status: 'done' },
            { id: 2, title: 'Build REST API', description: 'Implement NestJS endpoints', status: 'in-progress' },
            { id: 3, title: 'Write tests', description: 'Unit + e2e test coverage', status: 'pending' },
        ];
        this.nextId = 4;
    }
    findAll() {
        return this.tasks;
    }
    findOne(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task)
            throw new common_1.NotFoundException(`Task #${id} not found`);
        return task;
    }
    create(dto) {
        const task = {
            id: this.nextId++,
            title: dto.title,
            description: dto.description ?? '',
            status: dto.status ?? 'pending',
        };
        this.tasks.push(task);
        return task;
    }
    update(id, dto) {
        const task = this.findOne(id);
        Object.assign(task, dto);
        return task;
    }
    remove(id) {
        const task = this.findOne(id);
        this.tasks = this.tasks.filter((t) => t.id !== id);
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map