<script setup >
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
import { Input } from '@/components/ui/input'
const route=useRoute()
const formSchema = toTypedSchema(
    z.object({
        email: z
            .string()
            .email({ message: "Email must be a valid email address" }) // Validasi format email
            .min(5, { message: "Email must be at least 5 characters long" }) // Batas minimal karakter
            .max(50, { message: "Email must be at most 50 characters long" }), // Batas maksimal karakter
        name: z
            .string()
            .min(2, { message: "Nama must be at least 2 characters long" })
            .max(50, { message: "Nama must be at most 50 characters long" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(50, { message: "Password must be at most 50 characters long" }),
    })
)

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {

    isLoading.value = true
    errorMessage.value = ''

    try {
        // await authStore.register(values.email,values.name, values.password, 'driver' );
        const { data } = await useFetch(`http://localhost:8000/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                id:id,
                name: values.name,
                email: values.email,
                password: values.password,
                role: "driver"
            }
        });
        useRouter().push('/admin/driver');
    } catch (error) {
        errorMessage.value = 'Registration Failed'
    } finally {
        isLoading.value = false
    }
})
const fetchDrivers =ref({
    name:"",
    email:""
})
const fetchData = async () => {
    const {token} = useAuth();
    isLoading.value = true
    errorMessage.value = ''

    try {
        // await authStore.register(values.email,values.name, values.password, 'driver' );
        const { data } = await useFetch(`http://localhost:8000/api/profile/${route.params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        fetchDrivers.value=data.value
        
        email.value = fetchDrivers.value.email
        name.value = fetchDrivers.value.name

        document.getElementById('email').value = fetchDrivers.value.email
        document.getElementById('name').value = fetchDrivers.value.name
    } catch (error) {
        errorMessage.value = 'Registration Failed'
    } finally {
        isLoading.value = false
    }
}
const isLoading = ref(false)
const id = ref(route.params.id)
const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter();

fetchData();
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold tracking-tight mb-10">
            Daftarkan Driver!
        </h2>
        <form @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email Driver</FormLabel>
                    <FormControl>
                        <Input id="email" type="email" placeholder="Email Driver" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Masukan email driver untuk login.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Nama Driver</FormLabel>
                    <FormControl>
                        <Input id="name" type="text"  placeholder="Nama Driver" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Masukan nama driver.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password Driver</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Password Driver" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Masukan password driver untuk login.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button class="mt-10" type="submit">
                Submit
            </Button>
        </form>
    </div>
</template>