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
  <form @submit="onSubmit">
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
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
</template>
