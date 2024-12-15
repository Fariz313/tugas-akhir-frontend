<template>
    <div class="px-10 mb-3">
        <LMap @ready="readyData" id="map" @click="getCoordinates" style="height: 300px;" :zoom="zoom" ref="map"
            :center="center">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base" name="OpenStreetMap" class="rounded-lg" />
        </LMap>
        <button class="bg-yellow-300 rounded px-5 my-3 font-bold " @click="clearCoordinates">Hapus Tanda</button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { array } from 'zod';
const emit = defineEmits(['updateCoordinates'])
const zoom = ref(6);
let center = ref([-7.983908, 112.621391])
let map = ref("")
let markers
let markersArray = [];
const readyData = (event) => {
    map = event
    if (process.client) {
        getPosition.then((value) => {
            map.panTo({ lat: value.coords.latitude, lng: value.coords.longitude })
            map.setZoom(20)
        })

    }
}
const getPosition = new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, {})
});
const getCoordinates = (event) => {
    if (process.client) {
        import('leaflet').then(L => {
            // Add a new marker
            const marker = L.marker(event.latlng).addTo(map);

            // Push new marker's coordinates to the array
            markersArray.push([event.latlng.lat, event.latlng.lng]);

            // Emit the updated array of coordinates
            emit('updateCoordinates', markersArray);
        });
    }
}
const clearCoordinates = (event) => {
    if (process.client) {
        import('leaflet').then(L => {
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer)
                }
            });
            markersArray = [];

        });
    }
}

onMounted(() => {
})
</script>
