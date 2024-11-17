<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ref, onMounted } from 'vue';

const orderList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);

const fetchOrders = async (page = 1) => {
  const { token } = await useAuth();
  isLoading.value = true;
  try {
    const { data } = await useFetch(`http://localhost:8000/api/orders?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    });

    orderList.value = data.value?.data || [];
    totalPages.value = data.value?.last_page || 1;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
  } finally {
    isLoading.value = false;
  }
};

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
    fetchOrders(page);
  }
};

// Fetch initial data
onMounted(() => {
  fetchOrders(currentPage.value);
});
</script>

<template>
  <div class="container">
    <h2 class="text-2xl font-bold tracking-tight mb-10 text-slate-600">
      Daftar Order
    </h2>

    <!-- Table -->
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]">ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Waktu Pengambilan</TableHead>
          <TableHead class="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="order in orderList" :key="order.id">
          <TableCell class="font-medium">{{ order.id }}</TableCell>
          <TableCell>{{ order.type }}</TableCell>
          <TableCell>{{ order.address }}</TableCell>
          <TableCell>{{ order.status }}</TableCell>
          <TableCell>
            <div v-if="order.type=='one-time'">{{ order.date }}</div>
            <div v-else>
              Setiap Hari 
              <span v-if="order.day==0">Minggu</span>
              <span v-if="order.day==1">Senin</span>
              <span v-if="order.day==2">Selasa</span>
              <span v-if="order.day==3">Rabu</span>
              <span v-if="order.day==4">Kamis</span>
              <span v-if="order.day==5">Jumat</span>
              <span v-if="order.day==6">Sabtu</span>
            </div>
          </TableCell>
          <TableCell class="text-right">
            <Button variant="destructive">Batalkan</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button :disabled="currentPage === 1 || isLoading" @click="changePage(currentPage - 1)" class="btn btn-secondary">
        Previous
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button :disabled="currentPage === totalPages || isLoading" @click="changePage(currentPage + 1)"
        class="btn btn-secondary">
        Next
      </button>
    </div>
  </div>
</template>
