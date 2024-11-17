<script setup>
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
    let payloadData = {
        address: address.value,
        type: type.value,
        lat: latitude.value,
        lng: longitude.value
      }
      if(payloadData.type=="subscription"){
        payloadData.day = day.value
      }
    const { data } = await $fetch(`http://localhost:8000/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sAuth.token.value
      },
      body: payloadData
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
const day = ref('one-time');
const latitude = ref(null);
const longitude = ref(null);

const handleCoordinates = (coords) => {
  latitude.value = coords.lat;
  longitude.value = coords.lng;
  console.log(coords);

};

const changeType = (selectedType)=>{
  type.value=selectedType
}

</script>

<template>
  <div>
    <nuxt-link to="/order/list">
      <Button>Daftar Langganan</Button>
    </nuxt-link>
    <Tabs default-value="one-time" class="w-100% flex flex-col">
      <TabsList v-model="type" class="grid w-full grid-cols-2">
        <TabsTrigger @click="changeType('one-time')" value="one-time">
          Sekali Ambil
        </TabsTrigger>
        <TabsTrigger @click="changeType('subscription')" value="subscription">
          Langganan
        </TabsTrigger>
      </TabsList>
      <div>
        <TabsContent  value="one-time" class="grow">
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
        <TabsContent  value="subscription" class="grow">
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
              <Select v-model="day">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup style="z-index: 99;">
                    <SelectItem value="1">Senin</SelectItem>
                    <SelectItem value="2">Selasa</SelectItem>
                    <SelectItem value="3">Rabu</SelectItem>
                    <SelectItem value="4">Kamis</SelectItem>
                    <SelectItem value="5">Jumat</SelectItem>
                    <SelectItem value="6">Sabtu</SelectItem>
                    <SelectItem value="0">Minggu</SelectItem>
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
  </div>
</template>

<style>
.leaflet-pane {
  z-index: 5 !important;
}

.leaflet-control {
  z-index: 6 !important;
}
</style>
