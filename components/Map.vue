<template>
    <div class="px-10 mb-3">
        <LMap @ready="readyData" id="map" @click="getCoordinates" style="height: 300px;" :zoom="zoom" ref="map"
            :center="center">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base" name="OpenStreetMap" class="rounded-lg" />
        </LMap>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['updateCoordinates'])
const zoom = ref(6);
let center = ref([-7.983908, 112.621391])
let map = ref("")
let markers
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
            map.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer)
                }
            });
            const marker = L.marker(event.latlng).addTo(map);
                emit('updateCoordinates', event.latlng);
        });
    }
}

onMounted(() => {
})
</script>
