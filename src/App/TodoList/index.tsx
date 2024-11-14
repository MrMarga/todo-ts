import type { ReactElement } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import type { AppState } from '../../dataStructure';
import { recoilState } from '../../dataStructure';

import Item from './Item';
import { Layout } from './style';
import { CustomLogger } from "retack-sdk-app-observer";

// Initialize the Retack SDK
const envKey = "Az_HeaKWLmFpXl7X4U6GynzR";
const appVersion = "1.0.4";

try {
  CustomLogger.init(envKey, appVersion);
} catch (initError) {
  console.error("Error initializing CustomLogger:", initError);
}

const TodoList: React.FC = () => {
  const { pathname } = useLocation();
  const [appState, setAppState] = useRecoilState<AppState>(recoilState);

  function toggleAllCheckbox(e: React.ChangeEvent<HTMLInputElement>): void {
    // Reverse all todo.completed: boolean flag
    setAppState({
      todoList: appState.todoList.map((t: Todo): Todo => ({
        ...t,
        completed: e.target.checked,
      })),
    });
  }

  try {
    // Application code
    // Example: Intentionally throw an error to test the SDK
    throw new Error("Test error");
  } catch (error) {
    // Manually report the error after casting it to Error
    CustomLogger.logError(error as Error);
  }

  return (
    <Layout>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={toggleAllCheckbox}
          data-cy="toggle-all-btn"
          data-testid="toggle-all-btn"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list" data-testid="todo-list">
          {appState.todoList
            .filter((t: Todo): boolean => {
              switch (pathname) {
                case '/':
                  return true;
                case '/active':
                  return t.completed === false;
                case '/completed':
                  return t.completed === true;
                default:
                  return true;
              }
            })
            .map((t: Todo): ReactElement => {
              return <Item key={t.id} todo={t} />;
            })}
        </ul>
      </section>
    </Layout>
  );
};

export default TodoList;
