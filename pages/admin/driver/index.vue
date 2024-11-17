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

const driverList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);

const fetchDrivers = async (page = 1) => {
    const {token} = await useAuth();
    isLoading.value = true;
    try {
        const { data } = await useFetch(`http://localhost:8000/api/users?role=driver&page=${page}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token  
            },
        });
        driverList.value = data.value?.user?.data || [];
        totalPages.value = data.value?.user?.last_page || 1;
    } catch (error) {
        console.error('Failed to fetch driver:', error);
    } finally {
        isLoading.value = false;
    }
};

const changePage = (page) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
        fetchDrivers(page);
    }
};

// Fetch initial data
onMounted(() => {
    fetchDrivers(currentPage.value);
});
</script>

<template>
    <div class="container">
        <h2 class="text-2xl font-bold tracking-tight mb-10 text-slate-600">
            Daftar Driver
        </h2>
        <nuxt-link to="/admin/driver/register"> <Button>Tambahkan Driver</Button> </nuxt-link>
        <!-- Table -->
        <Table>
            <TableCaption>A list of your recent driver.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead class="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="driver in driverList" :key="driver.id">
                    <TableCell class="font-medium">{{ driver.id }}</TableCell>
                    <TableCell>{{ driver.name }}</TableCell>
                    <TableCell>{{ driver.email }}</TableCell>
                    <TableCell class="text-right">
                        <NuxtLink :to="'/admin/driver/edit/'+driver.id">
                            <Button >Edit</Button>
                        </NuxtLink>
                        <Button variant="destructive" >Delete</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
            <button
                :disabled="currentPage === 1 || isLoading"
                @click="changePage(currentPage - 1)"
                class="btn btn-secondary"
            >
                Previous
            </button>

            <span>Page {{ currentPage }} of {{ totalPages }}</span>

            <button
                :disabled="currentPage === totalPages || isLoading"
                @click="changePage(currentPage + 1)"
                class="btn btn-secondary"
            >
                Next
            </button>
        </div>
    </div>
</template>
