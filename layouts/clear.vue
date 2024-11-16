<template>
    <div class="light-mode">
      <Navbar />
      <div class="w-full flex h-svh max-h-svh ">
        <!-- <div class="flex-[0.3]"> -->
          <!-- <SidebarPage /> -->
        <!-- </div> -->
        <div class="p-4 flex-1">
          <slot />
    
        </div>
        <!-- <Footer /> -->
      </div>
    </div>
  </template>
  <script setup>
  const sAuth = useAuth();
  
  </script>
  