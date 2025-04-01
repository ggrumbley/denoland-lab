<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import TaskForm from './components/TaskForm.vue'
import { type Task, type TaskFilter, TASK_FILTERS } from './app.types';
import TaskList from './components/TaskList.vue';
import FilterButton from './components/FilterButton.vue';




  const message = ref("Hello World")
  const tasks = ref<Task[]>([])
  const filter = ref<TaskFilter>(TASK_FILTERS.ALL)

  const totalDone = computed(() => (
    tasks.value.reduce((total, task) => task.done ? total + 1 : total, 0)
  ))

  const filteredTasks = computed(() => {
    switch (filter.value) {
      case TASK_FILTERS.ALL:
        return tasks.value
      case TASK_FILTERS.DONE:
        return tasks.value.filter((task) => task.done)
      case TASK_FILTERS.TODO:
        return tasks.value.filter((task) => !task.done)
      default:
        return tasks.value
    }
  })


  const addTask = (newTask: string) => {
    tasks.value.push({
      id: crypto.randomUUID(),
      title: newTask,
      done:  false
    })

  }

  const handleToggleDone = (id: string) => {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.done = !task.done
    }
  }

  const handleRemoveTask = (id: string) => {
    const taskIndex = tasks.value.findIndex((task) => task.id === id)
    if (taskIndex !== -1) {
      tasks.value.splice(taskIndex, 1)
    }
  }

  const handleSetFilter = (filterValue: TaskFilter) => {
    filter.value = filterValue
  }
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @add-task="addTask"/>
    <h3 v-if="!tasks.length">Add a task to get started.</h3>
    <h3 v-else>{{ totalDone }} / {{ tasks.length }} tasks completed</h3>
    <div class="button-container" v-if="tasks.length">
      <FilterButton
        :currentFilter="filter"
        :filter="TASK_FILTERS.ALL"
        @set-filter="handleSetFilter"
      />
      <FilterButton
        :currentFilter="filter"
        :filter="TASK_FILTERS.TODO"
        @set-filter="handleSetFilter"
      />
      <FilterButton
        :currentFilter="filter"
        :filter="TASK_FILTERS.DONE"
        @set-filter="handleSetFilter"
      />
    </div>
    <TaskList
      :tasks="filteredTasks"
      @toggle-done="handleToggleDone"
      @remove-task="handleRemoveTask"
    />
  </main>
</template>

<style scoped>
 main {
  max-width: 800px;
  margin: 1rem auto;
 }

.button-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}
</style>
