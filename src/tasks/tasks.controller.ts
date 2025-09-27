import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import type { Task } from '@prisma/client';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService:  TasksService) {}

    @Get('/:id')
    async getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(parseInt(id));
    }

    @Post('/:id')
    async createTask(@Param('id') id: string, @Body() task: Task) {
        return this.taskService.createTask({...task, userId: parseInt(id)});
    }

    @Get('/:id/user')
    async getTaskByUserId(@Param('id') id: string) {
        return this.taskService.getTaskByUserId(parseInt(id));
    }

    @Put('/:id')
    async updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto) {
        return this.taskService.updateTaskDetails(parseInt(id), task);
    }   

    @Delete('/:id')
    async deleteTask(@Param('id') id: string) {
        return this.taskService.deleteTask(parseInt(id));
    }
}
