import { TodoStatusKeys } from "@/types/todoStatusKeys";

export type Todo = {
    todoId: string;
    todoContent: string;
    status: TodoStatusKeys;
};
