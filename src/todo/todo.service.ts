import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'src/database/todos.json');
@Injectable()
export class TodoService {
  async create(createTodoDto: CreateTodoDto) {
    try {
      const data = await readFile(filePath, 'utf-8');
      const result = JSON.parse(data);
      const id = result.length + 1;
      result.push({ id, ...createTodoDto });
      await writeFile(filePath, JSON.stringify(result));
      return createTodoDto;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const data = await readFile(filePath, 'utf-8');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const data = await readFile(filePath, 'utf-8');
      const res = JSON.parse(data);
      const final = res.filter((item) => (item.id = id));
      if (!final) {
        return `Not found`;
      }
      return final;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const data = await readFile(filePath, 'utf-8');
      const res = JSON.parse(data);
      const index = res.findIndex((item) => (item.id = id));
      res[index] = { ...res[index], ...updateTodoDto };
      await writeFile(filePath, JSON.stringify(res, null, 2));
      return res[index];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    const data = await readFile(filePath, 'utf-8');
    const res = JSON.parse(data);
    const index = res.findIndex((item) => (item.id = id));
    res.splice(index, 1);
    await writeFile(filePath, JSON.stringify(res));
    return `This action removes a #${id} todo`;
  }
}
