<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

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

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)
})

const address = {};
const type = {};

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
    <TabsContent value="one-time" class="grow ">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Alamat</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="address" />
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
    <TabsContent value="subscription" class="grow ">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Alamat</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="address" />
          </FormControl>
          <FormDescription>
            Masukan alamat rumah anda
          </FormDescription>
          <FormMessage />
        </FormItem>
        <FormItem>
          <FormLabel>Hari Pengambilan Setiap Minggu:</FormLabel>
          <Select v-bind="type">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup style="z-index: 99;">
                <SelectItem>
                  Senin
                </SelectItem>
                <SelectItem>
                  Selasa
                </SelectItem>
                <SelectItem>
                  Rabu
                </SelectItem>
                <SelectItem>
                  Kamis
                </SelectItem>
                <SelectItem>
                  Jumat
                </SelectItem>
                <SelectItem>
                  Sabtu
                </SelectItem>
                <SelectItem>
                  Minggu
                </SelectItem>
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
    <form @submit="onSubmit">

    </form>
  </Tabs>
</template>
<style>
.leaflet-pane{
  z-index: 5 !important;
}
.leaflet-control{
  z-index: 6 !important;
}
</style>