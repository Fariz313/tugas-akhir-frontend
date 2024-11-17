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

const userList = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);

const fetchusers = async (page = 1) => {
    const {token} = await useAuth();
    isLoading.value = true;
    try {
        const { data } = await useFetch(`http://localhost:8000/api/users?role=user&page=${page}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token  
            },
        });

        userList.value = data.value?.user?.data || [];
        totalPages.value = data.value?.user?.last_page || 1;
    } catch (error) {
        console.error('Failed to fetch user:', error);
    } finally {
        isLoading.value = false;
    }
};

const changePage = (page) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
        fetchusers(page);
    }
};
const deleteUser = async (id) => {
    const {token} = await useAuth();
    isLoading.value = true;
    try {
        const { data } = await useFetch(`http://localhost:8000/api/deleteUser/${id}`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token  
            },
        });

        fetchusers(currentPage.value)
    } catch (error) {
        console.error('Failed to fetch user:', error);
    } finally {
        isLoading.value = false;
    }
};
// Fetch initial data
onMounted(() => {
    fetchusers(currentPage.value);
});
</script>

<template>
    <div class="container">
        <h2 class="text-2xl font-bold tracking-tight mb-10 text-slate-600">
            Daftar user
        </h2>
        
        <!-- Table -->
        <Table>
            <TableCaption>A list of your recent user.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead class="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="user in userList" :key="user.id">
                    <TableCell class="font-medium">{{ user.id }}</TableCell>
                    <TableCell>{{ user.name }}</TableCell>
                    <TableCell>{{ user.email }}</TableCell>
                    <TableCell class="text-right">
                        <Button :disabled=isLoading variant="destructive" @click="deleteUser(user.id)">Delete</Button>
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
