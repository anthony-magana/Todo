import {ReactNode, createContext, useContext, useState } from 'react';
import { Todo } from '../types/Todo';


type TodoContextType = {
    todos: Todo[],
    removeTodo: (id: number) => void,
    addTodo: (todo: Todo) => void,
    updateCompleted: (id: number, completed: boolean) => void,
    setDbTodos: (dbtodos: Todo[]) => void,
}

const TodoContext = createContext<TodoContextType>({} as TodoContextType);

const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    
    const addTodo = async (todo: Todo) => {
        try {
            await fetch(`${process.env.REACT_APP_ENDPOINT}/todos/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    title: todo.title,
                    description: todo.description,
                }),
            });
            setTodos([...todos, todo]);
        } catch(err) {
            console.log(err);
        }
    };
    
    const removeTodo = async (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
        try {
            await fetch(`${process.env.REACT_APP_ENDPOINT}/todos/delete/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
        } catch(err) {
            console.log(err);
        }
    };

    const updateCompleted = async (id: number, completed: boolean) => {
        try {
            await fetch(`${process.env.REACT_APP_ENDPOINT}/todos/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ completed }),
            }).then(() => {
                setTodos(todos.map(todo => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            completed,
                        };
                    }
                    return todo;
                }));
            });
        } catch(err) {
            console.log(err);
        }
    };

    const setDbTodos = (dbtodos: Todo[]) => {
        setTodos(dbtodos);
    }
    
    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, updateCompleted, setDbTodos }}>
        {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => useContext(TodoContext);

export default TodoProvider;