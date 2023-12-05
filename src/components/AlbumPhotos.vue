<script setup>
	import { ref, onMounted } from "vue";
	import axios from "axios";

	const props = defineProps(["albumId"]);

	const photos = ref([]);

	const loadPhotos = async () => {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/photos?albumId=${props.albumId}`
			);
			photos.value = response.data;
		} catch (error) {
			console.error("Error al cargar fotos del álbum", error);
		}
	};

	onMounted(loadPhotos);
</script>

<template>
	<div>
		<h3>Fotos del Álbum {{ albumId }}</h3>
		<div v-if="photos.length" class="grid-container">
			<div v-for="photo in photos" :key="photo.id" class="grid-item">
				<img :src="photo.thumbnailUrl" alt="Miniatura de la Foto" />
				<p>{{ photo.title }}</p>
			</div>
		</div>
		<p v-else>No hay fotos disponibles para este álbum.</p>
	</div>
</template>

<style scoped>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		grid-gap: 10px;
	}

	.grid-item {
		text-align: center;
	}
</style>
