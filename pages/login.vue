<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const user = ref({
  email: '',
  password: '',
});
const router = useRouter();
const login = async () => {
  await authenticateUser(user.value);
  console.log("isi,",authenticated.value);
  
  if (authenticated.value) {
    router.push('/');
  }
};
</script>
<template>
  <div class="mt-24 p-50 max-w-screen-md min-h-96 mx-auto my-auto grid gap-6">
    <form @submit.prevent="login">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">Email</Label>
          <Input id="email" v-model="user.email" placeholder="name@example.com" type="email" auto-capitalize="none"
            auto-complete="email" auto-correct="off" />
          <Input id="password" v-model="user.password" placeholder="password" type="password" auto-capitalize="none"
            auto-complete="password" auto-correct="off" />
        </div>
        <Button>
          Sign In with Email
        </Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t"></span>
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <router-link to="/register" class="bg-background px-2 text-muted-foreground">
          Or register
        </router-link>
      </div>
    </div>
  </div>
</template>
