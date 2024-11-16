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

const createOrder = async () => {
  const sAuth = useAuth();
  try {
    const { data } = await useFetch(`http://localhost:8000/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sAuth.token
      },
      body: {
        address: address.value,
        type: type.value,
        lat: latitude.value,
        lng: longitude.value
      }
    });
    if (data.value) {
      console.log('Form submitted!', data.value);
      useRouter().push('/');
    }
  } catch (error) {
    console.error('There was an error submitting the form', error);
  }
};

const address = ref('');
const type = ref('one-time');
const latitude = ref(null);
const longitude = ref(null);

const handleCoordinates = (coords: any) => {
  latitude.value = coords.lat;
  longitude.value = coords.lng;
  console.log(coords);

};

</script>

<template>
  <Tabs default-value="one-time" class="w-100% flex flex-col">
    <TabsList v-model="type" class="grid w-full grid-cols-2">
      <TabsTrigger value="one-time">
        Sekali Ambil
      </TabsTrigger>
      <TabsTrigger value="subscription">
        Langganan
      </TabsTrigger>
    </TabsList>
    <div>
      <TabsContent value="one-time" class="grow">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Alamat</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Masukan alamat" v-model="address" />
            </FormControl>
            <FormDescription>
              Masukan alamat rumah anda
            </FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Masukan Lokasi, Tap Pada Lokasi Rumah Anda!</FormLabel>
            <Map @updateCoordinates="handleCoordinates" />
          </FormItem>
        </FormField>
        <Button class="my-3 w-full" type="button" @click="createOrder">
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
            <Map @updateCoordinates="handleCoordinates" />
          </FormItem>
        </FormField>
        <Button class="my-3 mb-20 w-full" type="button" @click="createOrder">
          Submit
        </Button>
      </TabsContent>
    </div>
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
