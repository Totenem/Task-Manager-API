import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient} from '@prisma/client';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';
const prisma = new PrismaClient

@Injectable()
export class TasksService {

    // create a task
    async createTask (task: Task) {
        return await prisma.task.create({
            data: task
        })
    }
    
    // get task by id
    async getTaskById (id: Task["id"]){
        const task  = await prisma.task.findUnique({
            where: {
                id
            }
        });
        
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    // get Task by the creatore Id or User Id
    async getTaskByUserId (userId: Task['userId']) {
        const task = await prisma.task.findMany({
            where: {
                userId
            }
        })

        if (!task){
            throw new NotFoundException('Task Not Found')
        }

        return task
    }

    // update tasks details
    async updateTaskDetails (id: Task['id'], updateData: UpdateTaskDto){
        const allowedUpdates: Partial<Pick<Task, 'title' | 'description' | 'status' | 'dueDate'>> = {};

        if (updateData.title){
            allowedUpdates.title = updateData.title;
        }
        if (updateData.description){
            allowedUpdates.description = updateData.description;
        }
        if (updateData.status){
            allowedUpdates.status = updateData.status;
        }
        if (updateData.dueDate){
            allowedUpdates.dueDate = updateData.dueDate;
        }

        if (Object.keys(allowedUpdates).length === 0){
            throw new BadRequestException('No updates provided');
        }

        const task = await prisma.task.update({
            where: { id },
            data: allowedUpdates
        })

        return task
        
    }

    async deleteTask (id: Task['id']){
        return await prisma.task.delete({
            where: {id}
        })
    }
}
