<template>
    <div class="min-h-52">
        <LMap @ready="readyData" id="map" @click="getCoordinates" style="height: 500px;" :zoom="zoom" ref="map" :center="center">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base" name="OpenStreetMap" />
        </LMap>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const zoom = ref(6)
let center = ref([47.21322, -1.559482])
let map = ref("")
const readyData = (event)=>{
    map=event
}
const getCoordinates = (event) => {
    console.log(event.latlng);
    console.log(event);
    if (process.client) {
        map.panTo(event.latlng)
    }
} 
</script>
