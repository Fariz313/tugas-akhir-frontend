<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values);
  
  try {
    const response = await axios.post('http://localhost:8000/api/order', values);
    console.log('Form submitted!', response.data);
  } catch (error) {
    console.error('There was an error submitting the form', error);
  }
});

const address = ref('');
const type = ref('');
</script>

<template>
  <Tabs default-value="one-time" class="w-100% flex flex-col">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="one-time">
        Sekali Ambil
      </TabsTrigger>
      <TabsTrigger value="subscription">
        Langganan
      </TabsTrigger>
    </TabsList>
    <form @submit="onSubmit">
      <TabsContent value="one-time" class="grow">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Alamat</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-model="address" />
            </FormControl>
            <FormDescription>
              Masukan alamat rumah anda
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Masukan Lokasi, Tap Pada Lokasi Rumah Anda!</FormLabel>
            <Map />
          </FormItem>
        </FormField>
        <Button class="my-3 w-full" type="submit">
          Submit
        </Button>
      </TabsContent>
      <TabsContent value="subscription" class="grow">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Alamat</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-model="address" />
            </FormControl>
            <FormDescription>
              Masukan alamat rumah anda
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Hari Pengambilan Setiap Minggu:</FormLabel>
            <Select v-model="type">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup style="z-index: 99;">
                  <SelectItem value="Senin">Senin</SelectItem>
                  <SelectItem value="Selasa">Selasa</SelectItem>
                  <SelectItem value="Rabu">Rabu</SelectItem>
                  <SelectItem value="Kamis">Kamis</SelectItem>
                  <SelectItem value="Jumat">Jumat</SelectItem>
                  <SelectItem value="Sabtu">Sabtu</SelectItem>
                  <SelectItem value="Minggu">Minggu</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription>
              You can manage email addresses in your
              <!-- <a href="/examples/forms">email settings</a>. -->
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Masukan Lokasi, Tap Pada Lokasi Rumah Anda!</FormLabel>
            <Map />
          </FormItem>
        </FormField>
        <Button type="submit" class="my-3 w-full">
          Submit
        </Button>
      </TabsContent>
    </form>
  </Tabs>
</template>

<style>
.leaflet-pane {
  z-index: 5 !important;
}
.leaflet-control {
  z-index: 6 !important;
}
</style>
