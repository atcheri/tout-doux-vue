<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Todo } from "../models/Todo";
import storage from "../services/storage";

const todos = ref<Todo[]>([]);
const category = ref(null);
const content = ref("");

const disabled = computed(() => !category.value || !content.value.trim());

const addTodo = () => {
  if (!category.value || !content.value.trim()) {
    return;
  }
  const todo = {
    id: todos.value.length + 1,
    content: content.value.trim(),
    category: category.value,
    done: false,
    createdAt: new Date().getTime(),
  };

  todos.value.push(todo);

  content.value = "";
  category.value = null;
};

const removeTodo = (todoId: number) => {
  todos.value = todos.value.filter((t) => t.id !== todoId);
};

watch(
  todos,
  (newTodos) => {
    storage.saveTodos(newTodos);
  },
  { deep: true }
);

watch(content, (newContent) => {
  console.log("changed with", newContent);
});

onMounted(() => {
  todos.value = storage.getTodos();
});
</script>

<template>
  <section class="create-todo">
    <form @submit.prevent="addTodo">
      <h4>What do you need tout doux?</h4>
      <input
        type="text"
        v-model="content"
        placeholder="something in your mind?"
      />
      <h4>Choose a category</h4>
      <div class="options">
        <label>
          <input
            type="radio"
            name="category"
            value="business"
            v-model="category"
          />
          <span class="bubble business"></span>
          <div>Business</div>
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="personal"
            v-model="category"
          />
          <span class="bubble personal"></span>
          <div>Personal</div>
        </label>
      </div>
      <button :disabled="disabled" type="submit">Add a todo</button>
    </form>
  </section>
  <secction>
    <div class="todo-list my-2">
      <ul class="list">
        <li
          v-for="todo in todos"
          :key="todo.id"
          :class="`p-2 todo-item ${todo.done && 'done'}`"
        >
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category}`"></span>
          </label>
          <div class="todo-content">
            <input class="todo-input" type="text" v-model="todo.content" />
          </div>
          <div class="actions">
            <button class="delete" @click="removeTodo(todo.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </secction>
</template>

<style scoped></style>
