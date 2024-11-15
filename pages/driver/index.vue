<script setup lang="ts">
const { authenticated,user } = storeToRefs(useAuthStore());

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
const { data, pending }: any = await useFetch('http://localhost:8000/api/users?role=driver', {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
});
const userList = data?.value?.user?.data
console.log(userList);


const invoices = [
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV002',
        paymentStatus: 'Pending',
        totalAmount: '$150.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV003',
        paymentStatus: 'Unpaid',
        totalAmount: '$350.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV004',
        paymentStatus: 'Paid',
        totalAmount: '$450.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV005',
        paymentStatus: 'Paid',
        totalAmount: '$550.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV006',
        paymentStatus: 'Pending',
        totalAmount: '$200.00',
        paymentMethod: 'Bank Transfer',
    },
    {
        invoice: 'INV007',
        paymentStatus: 'Unpaid',
        totalAmount: '$300.00',
        paymentMethod: 'Credit Card',
    },
]
</script>

<template>
    <div class="container">
        <h2 class="text-2xl font-bold tracking-tight mb-10 text-slate-600">
            Daftar Driver
        </h2>
        <h1>{{authenticated}}</h1>
        <div class="flex justify-end    ">
            <nuxt-link
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 me-2"
                to="driver/register">Add Driver</nuxt-link>
        </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px]">
                        ID
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead class="text-right">
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="user in userList" :key="user.id0">
                    <TableCell class="font-medium">
                        {{ user.id }}
                    </TableCell>
                    <TableCell>{{ user.name }}</TableCell>
                    <TableCell>{{ user.email }}</TableCell>
                    <TableCell class="text-right">
                        <Button class="me-2">
                            Edit
                        </Button>
                        <Button>
                            Delete
                        </Button>

                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

    </div>

</template>