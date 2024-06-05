import { tasks } from 'vscode'
import { computed, shallowRef } from '../reactivity'
import { createSingletonComposable } from '../utils'
import { useDisposable } from './useDisposable'

/**
 * @reactive `tasks.taskExecutions`
 */
export const useTaskExecutions = createSingletonComposable(() => {
  const taskExecutions = shallowRef(tasks.taskExecutions)

  function update() {
    taskExecutions.value = tasks.taskExecutions
  }

  useDisposable(tasks.onDidStartTask(update))
  useDisposable(tasks.onDidEndTask(update))

  return computed(() => taskExecutions.value)
})
