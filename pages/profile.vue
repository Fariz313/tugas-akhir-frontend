<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const API_URL = "http://localhost:8000"; // Replace with your actual API URL

const isLoading = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

const logout = () => {
  // authStore.logout();
};
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/profile`, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to load profile data');
  }
};

const updateUserProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/api/profile`, profileData, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    throw new Error('Update Failed');
  }
};

onMounted(async () => {
  try {
    const user = await getUserProfile();
    name.value = user.name;
    email.value = user.email;
  } catch (error) {
    errorMessage.value = error.message;
  }
});

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    await updateUserProfile({ name: name.value, email: email.value, password: password.value });
    successMessage.value = 'Profile updated successfully';
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="mt-24 p-50 max-w-screen-md min-h-96 mx-auto my-auto" :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <Label class="sr-only" for="name">Name</Label>
          <Input id="name" v-model="name" placeholder="Your Name" type="text" auto-capitalize="none"
            auto-complete="name" auto-correct="off" :disabled="isLoading" />
          <Label class="sr-only" for="email">Email</Label>
          <Input id="email" v-model="email" placeholder="name@example.com" type="email" auto-capitalize="none"
            auto-complete="email" auto-correct="off" :disabled="isLoading" />
          <Label class="sr-only" for="password">Password</Label>
          <Input id="password" v-model="password" placeholder="password" type="password" auto-capitalize="none"
            auto-complete="password" auto-correct="off" :disabled="isLoading" />
        </div>
        <Button :disabled="isLoading">
          <!-- <LucideSpinner v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" /> -->
          Update Profile
        </Button>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-500">{{ successMessage }}</p>
      </div>
    </form>
  </div>
</template>
