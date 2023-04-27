<template>
  <div class="card">
    <div class="text-center">
      <q-avatar text-color="black" icon="person" size="100px" />
    </div>
    <div class="text-h6 text-center q-pb-md">SING IN</div>
    <div class="double">
      <div class="filhos">
        <q-input
          class=""
          outlined
          v-model="firstName"
          label="fist name"
          lazy-rules
          :rules="[val => !!val || '']"
          type="text"
        />
      </div>
      <div class="filhos">
        <q-input
          class=""
          outlined
          v-model="lastName"
          label="last name"
          type="text"
          lazy-rules
          :rules="[val => !!val || '']"
        />
      </div>
      <div class="one">
        <q-input
          class=""
          outlined
          v-model="userName"
          label="user name"
          type="text"
          lazy-rules
          :rules="[val => !!val || '']"
        />
      </div>
      <div class="one">
        <q-input
          class=""
          outlined
          v-model="email"
          label="email"
          type="text"
          lazy-rules
          :rules="[val => regex.test(val) || '']"
        />
      </div>
      <div class="one">
        <q-input
          class=""
          outlined
          v-model="password"
          label="Password"
          type="password"
          lazy-rules
          :rules="[val => val.length >= 8 || 'deve conter pelo menos 8 caracters']"
        />
      </div>
      <div class="filhos">
        <q-btn
          label="voltar"
          color="secondary"
          @click="back"
          class="full-width"
        />
      </div>
      <div class="filhos">
        <q-btn
          label="confirmar"
          color="primary"
          @click="createUser"
          class="full-width"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLoginStore } from 'src/stores/useLoginStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import UserModel from '../models/User';

const router = useRouter();
const loginStore = useLoginStore();
const userName = ref('');
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const $q = useQuasar();
async function createUser() {

  try {
    let dados = {
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
    }
    loginStore.createUser(dados);
    // router.push({ path: '/' });
  } catch (e) {
    console.log('1111', e);
  }
}
async function back() {
  router.push({ path: '/' });
}
</script>
<style scoped>
.card {
  width: 35%;
  min-width: 320px;
}

.double {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.filhos {
  width: 47%;
}

.one{
  width: 100%;
}
</style>
