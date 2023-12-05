<script setup>
	import { ref, onMounted } from "vue";
	import axios from "axios";
	import AlbumPhotos from "./AlbumPhotos.vue";

	const props = defineProps(["userId"]);

	const albums = ref([]);
	const openAlbums = ref([]);

	const loadAlbums = async () => {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/users/${props.userId}/albums`
			);
			albums.value = response.data;
		} catch (error) {
			console.error("Error al cargar álbumes", error);
		}
	};

	const toggleAlbumPhotos = (albumId) => {
		const index = albums.value.findIndex((album) => album.id === albumId);
		openAlbums.value[index] = !openAlbums.value[index];
	};

	const isAlbumOpen = (albumId) => {
		const index = albums.value.findIndex((album) => album.id === albumId);
		return openAlbums.value[index];
	};

	onMounted(loadAlbums);
</script>

<template>
	<div>
		<h2>Listado de Álbumes para el Usuario {{ userId }}</h2>

		<ul>
			<li
				v-for="album in albums"
				:key="album.id"
				@click="viewPhotos(album.id)"
			>
				{{ album.title }}
				<button @click="toggleAlbumPhotos(album.id)">
					Mostrar Fotos
				</button>
				<AlbumPhotos v-if="isAlbumOpen(album.id)" :albumId="album.id" />
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
