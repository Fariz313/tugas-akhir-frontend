<script lang="ts" setup>
import { storeToRefs } from 'pinia';
const { signIn } = useAuth();

definePageMeta({
  layout: 'clear',
});

const loading = ref(false);
const errorMessage = ref(''); // To store the error message
const user = reactive({
  email: '',
  password: '',
});
const router = useRouter();

const login = async () => {
  loading.value = true;
  errorMessage.value = ''; // Clear previous error message
  try {
    let res = await signIn(
      { ...user },
      { callbackUrl: '/' } // Redirect after successful login
    );
    router.push('/'); // Redirect to home or desired route
  } catch (error) {
    errorMessage.value = 'Invalid email or password. Please try again.'; // Set the error message
    loading.value = false;
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
        <Button :disabled="loading">
          Sign In with Email
        </Button>
        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
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
