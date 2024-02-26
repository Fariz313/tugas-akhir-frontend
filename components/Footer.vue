<template>
    <div class="flex justify-around fixed w-screen bottom-0 bg-card drop-shadow-md py-3">
        <NuxtLink
            class="bg-card text-primary p-7 w-10 h-10 text-center align-middle flex items-center justify-center text-xl rounded-full"
            to="/"><i class="fa-solid fa-user"></i>
        </NuxtLink>
        <NuxtLink
            class="bg-card text-primary p-7 w-10 h-10 text-center align-middle flex items-center justify-center text-xl rounded-full"
            to="/">
            <i class="fa-solid fa-house"></i>
        </NuxtLink>
        <NuxtLink
            class="bg-card text-primary p-7 w-10 h-10 text-center align-middle flex items-center justify-center text-xl rounded-full"
            to="/order">
            <i class="fa-solid fa-truck-fast"></i>
        </NuxtLink>
    </div>
</template>
