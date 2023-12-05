<template>
	<div>
		<h1>Detalles del Usuario</h1>
		<div v-if="user">
			<div><strong>Nombre:</strong> {{ user.name }}</div>
			<div><strong>Usuario:</strong> {{ user.username }}</div>
			<div><strong>Email:</strong> {{ user.email }}</div>
			<div><strong>Ciudad:</strong> {{ user.address.city }}</div>
			<div><strong>Website:</strong> {{ user.website }}</div>
			<div>
				<strong>Nombre de la empresa:</strong> {{ user.company.name }}
			</div>
			<Albums :userId="userId" />
			<Todos :userId="userId" />
		</div>
		<div v-else>
			<p>Cargando detalles del usuario...</p>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { useRoute } from "vue-router";
	import axios from "axios";
	import Todos from "../components/Todos.vue"; // Ajusta la ruta según la ubicación real del componente
	import Albums from "../components/Albums.vue"; // Ajusta la ruta según la ubicación real del componente

	const route = useRoute();
	const user = ref(null);
	const userId = route.params.userId;

	const fetchUserDetails = async () => {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/users/${userId}`
			);
			user.value = response.data;
		} catch (error) {
			console.error("Error al cargar detalles del usuario", error);
		}
	};
	onMounted(fetchUserDetails);
</script>

<style scoped></style>
