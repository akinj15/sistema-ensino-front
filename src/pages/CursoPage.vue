<template>
  <q-page class="row justify-evenly">
    <div class="card">
      <div class="text-center">
        <q-avatar text-color="black" icon="person" size="100px" />
      </div>
      <div class="double">
        <div class="filhos">
          <q-input
            class=""
            outlined
            v-model="firstName"
            label="fist name"
            lazy-rules
            :rules="[(val) => !!val || '']"
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
            :rules="[(val) => !!val || '']"
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
            :rules="[(val) => !!val || '']"
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
            :rules="[(val) => regex.test(val) || '']"
          />
        </div>

        <div class="one">
          <q-input
            class=""
            outlined
            v-model="description"
            label="descrição"
            type="textarea"
            lazy-rules
            :rules="[(val) => !!val || '']"
          />
        </div>
        <div class="one">
          <q-input
            class=""
            outlined
            v-model="bio"
            label="bio"
            type="textarea"
            lazy-rules
            :rules="[(val) => !!val || '']"
          />
        </div>
        <div class="one">
          <q-btn
            label="salvar"
            color="primary"
            class="full-width"
            @click="save()"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useLoginStore } from 'src/stores/useLoginStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

let firstName = ref(String);
let lastName = ref(String);
let userName = ref(String);
let email = ref(String);
let bio = ref(String);
let description = ref(String);
let _id = ref(String);
let router = useRouter();

let loginStore = useLoginStore();
let create = async () => {
  try {
    if (loginStore.user._id.length == 1) {
      let e = await loginStore.getUserId();
      if (e) throw new Error();
    }
    firstName.value = loginStore.user.profile.firstName;
    lastName.value = loginStore.user.profile.lastName;
    email.value = loginStore.user.email;
    userName.value = loginStore.user.userName;
    description.value = loginStore.user.profile.description;
    bio.value = loginStore.user.profile.bio;
    _id.value = loginStore.user._id;
  } catch (e) {
    router.push({ path: '/' });
  }
};
create();
let save = async () => {
  let dados = {
    profile: {
      firstName: firstName.value,
      lastName: lastName.value,
      bio: bio.value,
      description: description.value,
    },
    email: email.value,
    userName: userName.value,
    _id: _id.value,
  };
  try {
    await loginStore.updateUser(dados);
  } catch (e) {
    return e;
  }
};
</script>
<style scoped>
.card {
  width: 80%;
  min-width: 320px;
  max-width: 700px;
}

.double {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.filhos {
  width: 47%;
}

.one {
  width: 100%;
}
</style>
