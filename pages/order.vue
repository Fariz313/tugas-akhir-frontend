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
  <Tabs default-value="account" class="w-100% flex flex-col">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="account">
        Sekali Ambil
      </TabsTrigger>
      <TabsTrigger value="password">
        Langganan
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account" class="grow ">
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <h1>Sekali Ambil</h1>
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
          <FormLabel>Jenis Pengambilan</FormLabel>
          <Select v-bind="type">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="once">
                  Sekali Ambil
                </SelectItem>
                <SelectItem value="subscription">
                  Langganan
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
      </FormField>
      <Button type="submit">
        Submit
      </Button>
    </TabsContent>
    <TabsContent value="password" class="grow ">
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
          <FormLabel>Jenis Pengambilan</FormLabel>
          <Select v-bind="type">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="once">
                  Sekali Ambil
                </SelectItem>
                <SelectItem value="subscription">
                  Langganan
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
          <FormLabel>Jenis Pengambilan</FormLabel>
          <LMap ref="map" :center="[47.21322, -1.559482]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
              layer-type="base" name="OpenStreetMap" />
          </LMap>
        </FormItem>
      </FormField>
      <Button type="submit" class="mt-auto">
        Submit
      </Button>

    </TabsContent>
    <form @submit="onSubmit">

    </form>
  </Tabs>
</template>
