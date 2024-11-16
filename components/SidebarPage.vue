<template>
    <aside class="bg-gray-100 text-dark w-64 p-4 space-y-4 h-full relative">
      <!-- Close Button -->
      <button
        v-if="isMobile"
        class="absolute top-4 right-4 bg-red-500 text-white p-2 rounded"
        @click="closeSidebar"
      >
        ✕
      </button>
      <nav>
        <ul class="space-y-2">
          <li><nuxt-link to="/admin/order" class="block py-2 px-4 hover:bg-gray-200 rounded">Order</nuxt-link></li>
          <li><nuxt-link to="/admin/driver" class="block py-2 px-4 hover:bg-gray-200 rounded">Driver</nuxt-link></li>
          <li><nuxt-link to="/admin/user" class="block py-2 px-4 hover:bg-gray-200 rounded">User</nuxt-link></li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    closeSidebar: Function,
  });
  
  const isMobile = ref(false);
  
  onMounted(() => {
    isMobile.value = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      isMobile.value = window.innerWidth < 768;
    });
  });
  </script>
  