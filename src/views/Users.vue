<script setup>
	import { ref, onMounted } from "vue";
	import axios from "axios";
	import { useRouter } from "vue-router";

	const users = ref([]);
	const router = useRouter();

	onMounted(async () => {
		try {
			const response = await axios.get(
				"https://jsonplaceholder.typicode.com/users/"
			);
			users.value = response.data;
		} catch (error) {
			console.error("Error al cargar usuarios", error);
		}
	});

	const viewDetails = (userId) => {
		router.push(`/user-details/${userId}`);
	};
</script>

<template>
	<div>
		<h1>Listado de Usuarios</h1>
		<ul>
			<li v-for="user in users" :key="user.id">
				{{ user.id }} {{ user.name }}
				<button @click="viewDetails(user.id)">Details</button>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
