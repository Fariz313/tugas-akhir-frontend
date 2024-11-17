<template>
  <Card>
    <CardHeader>
      <CardTitle>Jadwal Pengambilan Sampah</CardTitle>
      <CardDescription>2024/02/26</CardDescription>
    </CardHeader>
    <CardContent>
      <h3 class="text-primary bg-slate-100 px-3 py-4 rounded-lg">
        {{ todayOrderMessage }}
      </h3>
      <Calendar :attributes="attributes" />
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
const { token, data } = await useAuth();

if (data.value.role == "admin") {
  useRouter().push('/admin/order');
} else if (data.value.role == "driver") {
  useRouter().push('/driver');
}
// Reactive attributes array
const attributes = ref([]);
const todayOrderMessage = ref("Tidak ada jadwal untuk hari ini.");
onMounted(async () => {
  // Fetch orders from API

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

  const orders = data;
  const today = new Date();
  let hasOrderToday = false;
  let pickuped = null;
  if (orders) {
    // Parse orders to mark dates
    orders.forEach((order) => {
      if (order.type === "one-time" && order.date) {
        const orderDate = new Date(order.date);
        // Mark specific date for one-time orders
        attributes.value.push({
          key: `order-${order.id}`,
          highlight: {
            color: "purple",
            fillMode: "solid",
            contentClass: "italic",
          },
          dates: new Date(order.date),
        });
        if (isSameDate(orderDate, today)) {
          hasOrderToday = true;
          if (order.pickup_time) {
            pickuped = order.pickup_time;
          }
        }
      } else if (order.type === "subscription" && order.day !== null) {
        // Mark recurring days for subscription orders
        const dayIndex = order.day;
        const recurringDates = getAllRecurringDates(dayIndex);
        recurringDates.forEach((recDate) => {
          attributes.value.push({
            key: `subscription-${order.id}-${recDate.toISOString()}`,
            highlight: {
              color: "red",
              fillMode: "light",
            },
            dates: recDate,
          });
          if (isSameDate(recDate, today)) {
            hasOrderToday = true;
          }
          if (order.pickup_time) {
            pickuped = order.pickup_time;
          }
        });
      }
    });
  }
  if (hasOrderToday) {
    todayOrderMessage.value = "Truk Sampah Akan Segara datang ke rumah anda!";
    if(pickuped){
      todayOrderMessage.value = `Sampah anda telah diambil pada ${pickuped}!`;
    }
  }
});

// Helper function to calculate all recurring dates for a day
function getAllRecurringDates(dayIndex) {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const dates = [];

  // Loop through the month and find matching days
  for (let i = 0; i < 31; i++) {
    const date = new Date(startOfMonth);
    date.setDate(i + 1);
    if (date.getMonth() === startOfMonth.getMonth() && date.getDay() === dayIndex) {
      dates.push(date);
    }
  }

  return dates;
}

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
</script>
