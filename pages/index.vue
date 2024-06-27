<template>
  <Card>
    <CardHeader>
      <CardTitle>Jadwal Pengambilan Sampah</CardTitle>
      <CardDescription>2024/02/26</CardDescription>
    </CardHeader>
    <CardContent>
      <h3 class="text-primary bg-slate-100 px-3 py-4 rounded-lg">Truk sampah sedang perjalanan ke rumah anda !</h3>
      <Calendar />
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
</script>
