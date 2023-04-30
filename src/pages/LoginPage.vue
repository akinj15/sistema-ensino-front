<template>
  <div class="card">
    <div class="text-center">
      <q-avatar text-color="black" icon="o_person" size="150px" />
    </div>
    <div class="text-h6 text-center q-pb-md">SING IN</div>
    <q-input
      class=""
      outlined
      v-model="email"
      label="Email"
      type="text"
      :rules="[(val) => regex.test(val) || '']"
    />
    <q-input
      class=""
      outlined
      v-model="password"
      label="Password"
      type="password"
      @keyup.enter="logar()"
      :rules="[(val) => !!val || '']"
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

const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const router = useRouter();
const loginStore = useLoginStore();
const email = ref('');
const password = ref('');
const $q = useQuasar();
async function logar() {
  try {
    if (!email.value.length || !password.value.length) {
      $q.notify({
        message: 'Informe as informações necessarias',
        position: 'top-right',
        color: 'red',
      });
      return;
    }
    await loginStore.login(email.value, password.value);

    router.push({ path: '/index' });
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
