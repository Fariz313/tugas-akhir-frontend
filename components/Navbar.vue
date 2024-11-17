<template>
    <div class="flex justify-between w-screen p-4">
        <button  v-if="enableButton" class=" bg-slate-200 p-2 rounded" @click="toggleSidebar">
            <span v-if="!sidebarOn">☰</span>
            <span v-else>✕</span>
        </button>
        <h1 class="text-primary text-3xl font-black">APS</h1>
        <!-- <h1>Color mode: {{ $colorMode.value }}</h1> -->
        <select v-model="$colorMode.preference">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="sepia">Sepia</option>
        </select>
        <button class="ms-auto" @click="logout">
            Logout
        </button>
        <button @click="changeModeToggle"
            class="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-center"
            aria-label="Toggle dark mode">
            <svg width="24" height="24" class="ext-foreground" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path id="moonpath"
                    d="M12 3C10.8134 4.19491 10.1488 5.81141 10.1518 7.49539C10.1547 9.17936 10.825 10.7935 12.0157 11.9843C13.2065 13.175 14.8206 13.8453 16.5046 13.8482C18.1886 13.8512 19.8051 13.1866 21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path style="visibility: hidden;" id="moonpathshape"
                    d="M12 3C10.8134 4.19491 10.1488 5.81141 10.1518 7.49539C10.1547 9.17936 10.825 10.7935 12.0157 11.9843C13.2065 13.175 14.8206 13.8453 16.5046 13.8482C18.1886 13.8512 19.8051 13.1866 21 12C21 13.78 20.4722 15.5201 19.4832 17.0001C18.4943 18.4802 17.0887 19.6337 15.4442 20.3149C13.7996 20.9961 11.99 21.1743 10.2442 20.8271C8.49836 20.4798 6.89472 19.6226 5.63604 18.364C4.37737 17.1053 3.5202 15.5016 3.17294 13.7558C2.82567 12.01 3.0039 10.2004 3.68509 8.55585C4.36628 6.91131 5.51983 5.50571 6.99987 4.51677C8.47991 3.52784 10.22 3 12 3Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path style="visibility: hidden;" id="sunpath"
                    d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z M12 2V4 M12 20V22 M4.93005 4.93005L6.34005 6.34005 M17.66 17.66L19.07 19.07 M2 12H4 M20 12H22 M6.34005 17.66L4.93005 19.07 M19.07 4.93005L17.66 6.34005"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </button>

        <!-- <button
            class="whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center justify-center"
            aria-label="Toggle dark mode"><svg viewBox="0 0 15 15" width="1.2em" height="1.2em"
                class="w-[20px] h-5 text-foreground">
                <path fill="currentColor" fill-rule="evenodd"
                    d="M7.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5M2.197 2.197a.5.5 0 0 1 .707 0L4.318 3.61a.5.5 0 0 1-.707.707L2.197 2.904a.5.5 0 0 1 0-.707M.5 7a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm1.697 5.803a.5.5 0 0 1 0-.707l1.414-1.414a.5.5 0 1 1 .707.707l-1.414 1.414a.5.5 0 0 1-.707 0M12.5 7a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm-1.818-2.682a.5.5 0 0 1 0-.707l1.414-1.414a.5.5 0 1 1 .707.707L11.39 4.318a.5.5 0 0 1-.707 0M8 12.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zm2.682-1.818a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 1 1-.707.707l-1.414-1.414a.5.5 0 0 1 0-.707M5.5 7.5a2 2 0 1 1 4 0a2 2 0 0 1-4 0m2-3a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                    clip-rule="evenodd"></path>
            </svg></button> -->
    </div>
</template>
<script setup>
const colorMode = useColorMode();
const changeColor = () => (colorMode.preference = (colorMode.value === 'light' ? 'dark' : 'light'))
const router = useRouter();
const props = defineProps({
    toggleSidebar: Function,
    sidebarOn: Boolean,
});
const sAuth = useAuth();
const enableButton =ref(false);
console.log("EB",sAuth.data?.value?.role);

if (sAuth.data?.value?.role === 'admin' || sAuth.data?.value?.role === 'driver') {
    enableButton.value = true;
}
const logout = async () => {
    await sAuth.signOut({callbackUrl:"/login"});
    router.push('/');
}
</script>
