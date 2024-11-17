<template>
  <div class="light-mode">
    <Navbar :toggleSidebar="toggleSidebar" :sidebarOn="sidebarOn" />
    <div class="w-full flex h-svh max-h-svh">
      <!-- Sidebar -->
      <div
        v-if="sidebarOn"
        class="fixed z-50 md:relative md:flex-[0.2] bg-white shadow-lg h-full"
      >
        <SidebarPage :closeSidebar="closeSidebar" />
      </div>
      <!-- Main Content -->
      <div
        :class="{
          'ml-64 md:ml-0': sidebarOn && isMobile,
          'ml-0': !sidebarOn || !isMobile,
        }"
        class="p-4 flex-1 transition-all duration-300"
      >
        <slot />
      </div>
      <Footer v-if="!sidebarOn" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';
import SidebarPage from '~/components/SidebarPage.vue';

const sAuth = useAuth();
const sidebarOn = ref(false);
const isMobile = ref(false);

const toggleSidebar = () => {
  sidebarOn.value = !sidebarOn.value;
};

const closeSidebar = () => {
  if (isMobile.value) {
    sidebarOn.value = false;
  }
};

// Check if the user is an admin and show the sidebar
onMounted(() => {
const sAuth = useAuth();
  
  if (sAuth.data.value.role === 'admin' ) {
    sidebarOn.value = true;
  }
  checkMobile();
});

// Detect if the screen size is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768;
  });
};
</script>
