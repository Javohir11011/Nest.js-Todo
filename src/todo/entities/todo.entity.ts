import { todoStaus } from '../todo-type/todo.type';

export class Todo {
  id: number;
  title: string;
  description: string;
  comment: string;
  status: todoStaus;
}
