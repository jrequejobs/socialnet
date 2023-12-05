<script setup>
	import { ref, onMounted, watch } from "vue";
	import axios from "axios";

	const props = defineProps(["userId"]);

	const todos = ref([]);
	const newTodo = ref("");
	const searchText = ref("");

	const filteredTodos = ref([]);

	const loadTodos = async () => {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/todos?userId=${props.userId}`
			);
			todos.value = response.data;
			filteredTodos.value = todos.value;
		} catch (error) {
			console.error("Error al cargar TODOs", error);
		}
	};

	const editTodo = (todoId) => {};

	const deleteTodo = (todoId) => {};

	const addTodo = () => {
		if (/^[a-zA-Z\s]*$/.test(newTodo.value)) {
			todos.value.push({
				id: todos.value.length + 1,
				title: newTodo.value,
			});
			newTodo.value = "";
			filterTodos();
		} else {
			alert("El TODO debe contener solo letras y espacios.");
		}
	};

	const filterTodos = () => {
		filteredTodos.value = todos.value.filter((todo) =>
			todo.title.toLowerCase().includes(searchText.value.toLowerCase())
		);
	};

	onMounted(loadTodos);

	watch(searchText, filterTodos);
</script>

<template>
	<div>
		<h2>Listado de TODOs</h2>

		<input v-model="searchText" placeholder="Buscar por texto" />
		<ul>
			<li v-for="todo in filteredTodos" :key="todo.id">
				{{ todo.title }}
				<button @click="editTodo(todo.id)">Editar</button>
				<button @click="deleteTodo(todo.id)">Borrar</button>
			</li>
		</ul>

		<h2>Añadir Nuevo TODO</h2>
		<input v-model="newTodo" placeholder="Nuevo TODO" />
		<button @click="addTodo">Añadir TODO</button>
	</div>
</template>

<style scoped></style>
