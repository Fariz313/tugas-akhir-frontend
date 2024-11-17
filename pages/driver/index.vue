<template>
  <Card class="mb-10">
    <CardHeader>
      <CardTitle>Jadwal Pengambilan Sampah</CardTitle>
    </CardHeader>
  </Card>
  <Card v-for="order in orders" :key="order.id">
    <CardHeader>
      <CardTitle>Rumah : <b>{{ order.name }} </b></CardTitle>
    </CardHeader>
    <CardContent>
      <div>
        <div class="mb-5">
          Alamat : <br>
          {{ order.address }} <br>
          <nuxt-link :to="'https://maps.google.com/?q=' + order.lat + ',' + order.lng"><Button class="p-1">Buka Di
              Maps</Button></nuxt-link>
        </div>
        <Button :disabled="isLoading" v-if="!order.pickups_time" @click="submitPickup(order)">Pickup</Button>
        <Button disabled v-else>Sampah Telah diambil pada {{ order.pickups_time }}</Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
const { token } = await useAuth();
const orders = ref({})
// Reactive attributes array
const attributes = ref([]);
const todayOrderMessage = ref("Tidak ada jadwal untuk hari ini.");
const isLoading = ref(true);
const submitPickup = async (order) => {
  orders.value = []
  const { token } = await useAuth();
  isLoading.value = true;
  try {
    const { data } = await useFetch(`http://localhost:8000/api/pickups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: {
        order_id: order.id
      }
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  } finally {
    isLoading.value = false;
    fetchPickup();
  }
};

const fetchPickup = async (order) => {
  isLoading.value = true;

  const data = await $fetch(`http://localhost:8000/api/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token.value
    },
  });
  console.log("orders", data);
  if (!data) {
    console.error("Failed to fetch orders:", error.value);
    return;
  }

  orders.value = data;
  isLoading.value = false;

}
onMounted(async () => {
  // Fetch orders from API

  fetchPickup();

  const today = new Date();
  let hasOrderToday = false;
  isLoading.value = false;

});

</script>
