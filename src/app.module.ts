import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [AuthModule, UsersModule, TasksModule]
})
export class AppModule {}
