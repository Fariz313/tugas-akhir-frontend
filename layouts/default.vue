<template>
  <div class="h-screen light-mode">
    <Navbar />
    <div class="p-4">
      <slot />

    </div>
    <Footer />
  </div>
</template>
<script>
import { Button } from "@/components/ui/button";
export default {};
</script>
