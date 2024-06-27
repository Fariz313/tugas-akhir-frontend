export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();
    authStore.loadToken();
  
    if (!authStore.token && to.name !== 'login' && to.name !== 'register') {
      return navigateTo('/login');
    }
  });