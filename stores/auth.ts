import { defineStore } from 'pinia';
import type { register } from '~/services/auth';
interface UserPayloadInterface {
  email: string;
  password: string;
}
export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    user: {},
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const { data, pending }: any = await useFetch('http://localhost:8000/api/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password
        },
      });
      this.loading = pending;
      if (data.value) {
        const token = useCookie('token');
        const user = useCookie('user');
        if(data?.value?.token){
          token.value = data?.value?.token;
          user.value = data.value.user;
          this.authenticated = true;
          this.user = data.value.user;
        }
      }else{
        this.authenticated = false;
      }
    },
    async register(email:string,name:string,password:string,role:string) {
      const { data, pending }: any = await useFetch('http://localhost:8000/api/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          name,
          role,
          password
        },
      });
      this.loading = pending;
    },
    logUserOut() {
      const token = useCookie('token');
      this.authenticated = false;
      token.value = null;
    },
  },
});