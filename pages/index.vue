<template>
  <Card>
    <CardHeader>
      <CardTitle>Jadwal Pengambilan Sampah</CardTitle>
      <CardDescription>2024/02/26</CardDescription>
    </CardHeader>
    <CardContent>
      <h3 class="text-primary bg-slate-100 px-3 py-4 rounded-lg">Truk sampah sedang perjalanan ke rumah anda !</h3>
      <Calendar :attributes='attributes' />
    </CardContent>
  </Card>
</template>
<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from '@/components/ui/calendar'
definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory 
})

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
let attr:any     = null;
const attributes:any = ref([
  {
    key: 'today',
    highlight: {
      color: 'purple',
      fillMode: 'solid',
      contentClass: 'italic',
    },
    dates: new Date(year, month, 12),
  },
  {
    highlight: {
      color: 'purple',
      fillMode: 'light',
    },
    dates: new Date(year, month, 13),
  },
  {
    highlight: {
      color: 'purple',
      fillMode: 'outline',
    },
    dates: new Date(year, month, 14),
  },
]);
onMounted(async () => {
  attr = attributes
  
  });
</script>
