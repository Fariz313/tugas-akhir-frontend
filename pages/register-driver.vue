<template>
    <Card>
        <h1>TES</h1>
    </Card>
  </template>
  <script setup lang="ts">
  definePageMeta({
      middleware: 'auth' // this should match the name of the file inside the middleware directory 
  })
  </script>
  