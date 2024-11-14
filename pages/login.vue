<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth';

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter();
const authStore = useAuthStore();

async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true
  errorMessage.value = ''

  try {
    await authStore.login(email.value, password.value);
  } catch (error) {
    errorMessage.value = 'Login Failed'

  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="mt-24 p-50 max-w-screen-md min-h-96 mx-auto my-auto" :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="email">Email</Label>
          <Input id="email" v-model="email" placeholder="name@example.com" type="email" auto-capitalize="none"
            auto-complete="email" auto-correct="off" :disabled="isLoading" />
          <Input id="password" v-model="password" placeholder="password" type="password" auto-capitalize="none"
            auto-complete="password" auto-correct="off" :disabled="isLoading" />
        </div>
        <Button :disabled="isLoading">
          <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
          Sign In with Email
        </Button>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <router-link  to="/register" class="bg-background px-2 text-muted-foreground">
          Or register
        </router-link>
      </div>
    </div>
  </div>
</template>
