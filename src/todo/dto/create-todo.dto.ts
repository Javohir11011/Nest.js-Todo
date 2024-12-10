import { todoStaus } from '../todo-type/todo.type';

export class CreateTodoDto {
  title: string;
  description: string;
  comment: string;
  status: todoStaus;
}
