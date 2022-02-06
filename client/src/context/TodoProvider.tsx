import {ReactNode, createContext, useContext, useState } from 'react';
import { Todo } from '../types/Todo';


type TodoContextType = {
    todos: Todo[],
    removeTodo: (id: number) => void,
    addTodo: (todo: Todo) => void,
    updateCompleted: (id: number, completed: boolean) => void,
}

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    
    const addTodo = (todo: Todo) => {
        setTodos([...todos, todo]);
    };
    
    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const updateCompleted = (id: number, completed: boolean) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed,
                };
            }
            return todo;
        }));
    };
    
    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, updateCompleted }}>
        {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => useContext(TodoContext);

export default TodoProvider;