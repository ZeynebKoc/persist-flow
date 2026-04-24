import { describe, it, expect, beforeEach } from 'vitest'
import { useTodoStore } from './todoStore'
import { TaskPriority, TaskStatus } from '../types/todo.types'

function getStore() {
  return useTodoStore.getState()
}

function resetStore() {
  useTodoStore.setState({
    todos: [],
    filters: {
      tab: 'all',
      priority: 'all',
      search: '',
    },
  })
}

describe('todoStore', () => {
  beforeEach(() => {
    resetStore()
  })

  // addTodo
  describe('addTodo', () => {
    it('should add a new todo to the list', () => {
      getStore().addTodo('Test task', 'Test description', TaskPriority.MEDIUM)

      const { todos } = getStore()
      expect(todos).toHaveLength(1)
      expect(todos[0].title).toBe('Test task')
      expect(todos[0].description).toBe('Test description')
      expect(todos[0].priority).toBe(TaskPriority.MEDIUM)
    })
  })

  // updateTodo
  describe('updateTodo', () => {
    it('should update the specified fields', () => {
      getStore().addTodo('Old title', 'Old desc', TaskPriority.LOW)
      const id = getStore().todos[0].id

      getStore().updateTodo(id, { title: 'New title', priority: TaskPriority.HIGH })

      const updated = getStore().todos.find((t) => t.id === id)
      expect(updated?.title).toBe('New title')
      expect(updated?.priority).toBe(TaskPriority.HIGH)
    })
  })

  // deleteTodo (soft delete)
  describe('deleteTodo', () => {
    it('should set deletedAt instead of removing the todo', () => {
      getStore().addTodo('Task', '', TaskPriority.LOW)
      const id = getStore().todos[0].id

      getStore().deleteTodo(id)

      const { todos } = getStore()
      expect(todos).toHaveLength(1)
      expect(todos[0].deletedAt).not.toBeNull()
    })
  })

  // restoreTodo
  describe('restoreTodo', () => {
    it('should set deletedAt back to null', () => {
      getStore().addTodo('Task', '', TaskPriority.LOW)
      const id = getStore().todos[0].id

      getStore().deleteTodo(id)
      getStore().restoreTodo(id)

      const { todos } = getStore()
      expect(todos[0].deletedAt).toBeNull()
    })
  })

  // permanentlyDeleteTodo
  describe('permanentlyDeleteTodo', () => {
    it('should remove the todo from the list entirely', () => {
      getStore().addTodo('Task', '', TaskPriority.LOW)
      const id = getStore().todos[0].id

      getStore().permanentlyDeleteTodo(id)

      expect(getStore().todos).toHaveLength(0)
    })
  })

  // getFiltered
  describe('getFiltered', () => {
    it('should filter by status tab', () => {
      getStore().setTab(TaskStatus.IN_PROGRESS)
      const filtered = getStore().getFiltered()
      expect(filtered.every((t) => t.status === TaskStatus.IN_PROGRESS)).toBe(true)
    })
  })

  // filters
  describe('filters', () => {
    it('should update priority filter', () => {
      getStore().setPriority(TaskPriority.HIGH)
      expect(getStore().filters.priority).toBe(TaskPriority.HIGH)
    })
  })
})
