<template>
  <div class="card">
    <div class="text-center">
      <q-avatar text-color="black" icon="person" size="150px" />
    </div>
    <div class="text-h6 text-center q-pb-md">SING IN</div>
    <q-input
      class=""
      outlined
      v-model="user"
      label="Login"
      type="text"
      :rules="[val => !!val || '']"
    />
    <q-input
      class=""
      outlined
      v-model="password"
      label="Password"
      type="password"
      :rules="[val => !!val || '']"
    />
    <q-btn
      label="sing in"
      color="primary"
      @click="logar()"
      class="full-width q-mb-md q-mt-sm"
    />
    <q-btn
      label="sing up"
      color="secondary"
      @click="singup"
      class="full-width"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from 'src/stores/useLoginStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const loginStore = useLoginStore();
const user = ref('');
const password = ref('');
const $q = useQuasar();
async function logar () {
  try{
    await loginStore.login(user.value, password.value);
  } catch (e) {
    return e;
  }
}
async function singup() {
  router.push({ path: '/singup' });
}
</script>
<style scoped>
.card {
  width: 30%;
  min-width: 300px;
  padding-bottom: 100px;
}
</style>
