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
const isSheetOpen = ref(false); // Add this to control sheet state

const submitTheForm = async () => {
    const form = document.getElementById('formUpdate');
    if (form) {
        // Create a new FormData object for further manipulation if needed
        const formData = new FormData(form);

        // Prevent the default behavior of submission
        const event = new Event('submit', { cancelable: true, bubbles: true });
        const cancelled = !form.dispatchEvent(event); // Dispatch the submit event

        if (!cancelled) {
            console.log('Form submission prevented.');
            return;
        }

        // Your submission logic
        try {
            console.log('Submitting form data:', Object.fromEntries(formData));
            // Submit data via fetch, axios, or other API calls here
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    } else {
        console.error('Form with ID "formUpdate" not found.');
    }
}
const modelForm = ref({})

const submitUpdate = async (event) => {
    const { token } = await useAuth();
    isLoading.value = true;
    try {
        const { data } = await useFetch(`http://localhost:8000/api/update/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body:modelForm
        });
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    } finally {
        isLoading.value = false;
    }
};
const fetchOrders = async (page = 1) => {
    const { token } = await useAuth();
    isLoading.value = true;
    try {
        const { data } = await useFetch(`http://localhost:8000/api/orders?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
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
const clickTrigger = (order) => {
    modelForm.value = {}
    isSheetOpen.value = true
    modelForm.value = order
}
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
                    <TableHead class="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="order in orderList" :key="order.id">
                    <TableCell class="font-medium">{{ order.id }}</TableCell>
                    <TableCell>{{ order.type }}</TableCell>
                    <TableCell>{{ order.address }}</TableCell>
                    <TableCell>{{ order.status }}</TableCell>
                    <TableCell class="text-right">
                        <form id="formUpdate" @submit.prevent="submitUpdate">
                            <Sheet :open="isSheetOpen" @update:open="isSheetOpen = $event"> <!-- Control open state -->
                                <SheetTrigger as-child>
                                    <Button class="bg-cyan-400" @click="clickTrigger(order)">
                                        Detail
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Detail Order</SheetTitle>
                                        <SheetDescription>
                                            Make changes to your profile here. Click save when you're done.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div class="grid gap-4 py-4">
                                        <div class="grid grid-cols-4 items-center gap-4">
                                            <Label for="id" class="text-right">
                                                ID
                                            </Label>
                                            <Input name="id" readonly id="id" v-model:model-value="modelForm.id"
                                                class="col-span-3" />
                                        </div>
                                        <div class="grid grid-cols-4 items-center gap-4">
                                            <Label for="type" class="text-right">
                                                Type
                                            </Label>
                                            <Input name="type" id="type" v-model:model-value="modelForm.type"
                                                class="col-span-3" />
                                        </div>
                                        <div v-if="order.type == 'one-time'"
                                            class="grid grid-cols-4 items-center gap-4">
                                            <Label for="date" class="text-right">
                                                Date
                                            </Label>
                                            <Input name="date" type="date" id="date"
                                                v-model:model-value="modelForm.date" class="col-span-3" />
                                        </div>
                                        <div v-else class="grid grid-cols-4 items-center gap-4">
                                            <Label for="day" class="text-right">
                                                Day
                                            </Label>
                                            <select id="day" name="day"
                                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                                                v-model="modelForm.day">
                                                <option value="0">Minggu</option>
                                                <option value="1">Senin</option>
                                                <option value="2">Selasa</option>
                                                <option value="3">Rabu</option>
                                                <option value="4">Kamis</option>
                                                <option value="5">Jumat</option>
                                                <option value="6">Sabtu</option>
                                            </select>
                                        </div>
                                        <div class="grid grid-cols-4 items-center gap-4">
                                            <Label for="address" class="text-right">
                                                Address
                                            </Label>
                                            <Textarea id="address" name="address" class="col-span-3"
                                                v-model:model-value="modelForm.address"
                                                placeholder="Type your address here." />
                                                <div  class="col-span-4 ms-5" v-for="data,index in JSON.parse(modelForm.multilatlng)" :key="index">

                                                    <a target="_blank"class=""
                                                        :href="'https://maps.google.com/?q=' + data[0] + ',' + data[1   ]">Buka
                                                        di
                                                        Map {{ index+1 }}</a>
                                                </div>
                                        </div>
                                        <div class="grid grid-cols-4 items-center gap-4">
                                            <Label for="status" class="text-right">
                                                Status
                                            </Label>
                                            <select id="status" name="status"
                                                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                                                v-model="modelForm.status">
                                                <option value="pending">Pending</option>
                                                <option value="stopped">Berhenti</option>
                                                <option value="running">Berjalan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <SheetFooter>
                                        <Button type="submit" @click="submitTheForm">Save changes</Button>
                                        <!-- Remove SheetClose here -->
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </form>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <!-- Pagination -->
        <div class="flex justify-between items-center mt-4">
            <button :disabled="currentPage === 1 || isLoading" @click="changePage(currentPage - 1)"
                class="btn btn-secondary">
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
<style>
.bg-black\/80 {
    background-color: rgba(0, 0, 0, 0.212) !important;
}
</style>