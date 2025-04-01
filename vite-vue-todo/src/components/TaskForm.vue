<script lang="ts" setup>
  import { ref } from 'vue';

  const emit = defineEmits<{
    addTask: [newTask: string]
  }>()
  const newTask = ref("")
  const error = ref("")

  const formSubmitted = () => {
    if (!newTask.value.trim()) {
      error.value = "Task cannot be empty!"

      return
    }

    emit("addTask", newTask.value.trim())
    newTask.value = ''
  }
</script>

<template>
  <form @submit.prevent="formSubmitted">
      <label>
        New Task
        <input
          v-model="newTask"
          type="text"
          name="newTask"
          :aria-invalid="!!error || undefined"
          @input="error = ''"
        >
        <small v-if="error" id="invalid-helper">
          {{ error }}
        </small>
      </label>
      <div class="button-container">
        <button>Add</button>
      </div>
    </form>
</template>

<style scoped>
  .button-container {
    display: flex;
    justify-content: end;
  }
</style>
