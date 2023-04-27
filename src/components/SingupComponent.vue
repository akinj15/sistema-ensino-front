<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6 text-center">LOGIN</div>
    </q-card-section>
    <q-card-section>
      <q-input
        class="q-my-sm"
        outlined
        dense
        v-model="firstName"
        label="Login"
        type="text"
      />
      <q-input
        class="q-my-sm"
        outlined
        dense
        v-model="lastName"
        label="Login"
        type="text"
      />
      <q-input
        class="q-my-sm"
        outlined
        dense
        v-model="userName"
        label="Login"
        type="text"
      />
      <q-input
        class="q-my-sm"
        outlined
        dense
        v-model="email"
        label="Login"
        type="text"
      />
      <q-input
        class="q-my-sm"
        outlined
        dense
        v-model="password"
        label="Password"
        type="password"
      />
    </q-card-section>
    <q-card-section class="row justify-center">
      <q-btn
        dense
        label="login"
        color="secondary"
        icon="login"
        @click="logar"
        class="full-width"
      />
      <q-btn
        dense
        label="voltar"
        color="secondary"
        icon=""
        @click="back"
        class="full-width"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from 'src/stores/useLoginStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const loginStore = useLoginStore();
const userName = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const $q = useQuasar();
async function logar() {
  $q.loading.show();

  try {
    await loginStore.createUser({
      userName: userName.value,
      password: password.value,
      email: email.value,
      profile: {
        firstName: firstName.value,
        lastName: lastName.value,
        bio: ' ',
        description: ' ',
      },
      role: ['ALUNO'],
    });
    $q.loading.hide();
    router.push({ path: '/' });
  } catch (e) {
    $q.loading.hide();
    return e;
  }
}
async function back() {
  router.push({ path: '/' });
}
</script>
