// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 2-C  ·  Complete the Tasks controller
// ─────────────────────────────────────────────────────────────────────────────
// The service is already written for you. Your job is to wire up the routes.
//
// Endpoints to implement:
//   GET    /tasks          → return all tasks
//   GET    /tasks/:id      → return one task (use ParseIntPipe on :id)
//   POST   /tasks          → create a task, respond with 201
//   PATCH  /tasks/:id      → update a task
//   DELETE /tasks/:id      → delete a task
//
// Hint: look at products.controller.ts for the full pattern.
// ─────────────────────────────────────────────────────────────────────────────

import { Controller, Get, Post, HttpStatus, Patch, HttpCode, Delete, Param, ParseIntPipe, Body} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  // GET /tasks/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  // POST /tasks  (status 201)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  // PATCH /tasks/:id
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.
    tasksService.update(id, updateTaskDto);
  }

  // DELETE /tasks/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
