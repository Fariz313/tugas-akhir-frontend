<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script>
import nuxtStorage from 'nuxt-storage';
const dm = nuxtStorage.localStorage.getData('darkmode');
if(dm){
  let htmlElement = document.querySelector('html');
  htmlElement.classList.add('dark');
}
</script>