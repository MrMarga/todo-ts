import React, { createRef } from 'react'
import { useRecoilState } from 'recoil'

import type { AppState, Todo } from '../../dataStructure'
import { recoilState } from '../../dataStructure'


import { Layout } from './style'

import { CustomLogger } from "retack-sdk-app-observer";

// Initialize the Retack SDK
const envKey = "Az_HeaKWLmFpXl7X4U6GynzR";
const appVersion = "1.0.4";


try {
  CustomLogger.init(envKey, appVersion);
} catch (initError) {
  console.error("Error initializing CustomLogger:", initError);
}

const NewTodoTextInput: React.FC = () => {
  const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  const textInput: React.RefObject<HTMLInputElement> =
    createRef<HTMLInputElement>()

  function addTodo(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (textInput.current === null) return
    if (e.key === 'Enter' && textInput.current.value.trim().length > 0) {
      // make new TODO object
      const todo: Todo = {
        id: crypto.randomUUID(),
        bodyText: textInput.current.value,
        completed: false,
      }

      // add new TODO to entire TodoList
      setAppState({ todoList: [todo, ...appState.todoList] })

      // reset text input UI value
      textInput.current.value = ''
    }
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
      <header className="header">
        <h1>todos</h1>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          ref={textInput}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => addTodo(e)}
          data-testid="new-todo-input-text"
          data-cy="new-todo-input-text"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      </header>
    </Layout>
  )
}

export default NewTodoTextInput
