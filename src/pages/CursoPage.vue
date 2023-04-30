<template>
  <q-page class="row justify-evenly q-pa-lg q-gutter-md">
    <q-card
      v-for="curso in cursoStore.cursos"
      :key="curso._id"
      class="my-card card col-sm-12 col-md-4 col-lg-3"
      flat
      bordered
    >
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

      <q-card-section style="height: 194px; overflow-y: auto">
        <div class="text-overline text-orange-9">{{ curso.price }} $</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ curso.title }}</div>
        <div class="text-caption text-grey description">
          {{ curso.description }}
        </div>
      </q-card-section>

      <q-card-actions class="q-mt-auto max-heigth">
        <q-btn
          flat
          color="red"
          round
          icon="delete"
          @click="deleteCurso(curso._id)"
        />

        <q-space />
        <q-btn
          color="grey"
          round
          flat
          dense
          icon="edit"
          @click="openCurso(curso)"
        />
      </q-card-actions>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[25, 25]">
      <q-btn fab icon="add" color="primary" @click="openCurso()" />
    </q-page-sticky>
  </q-page>

  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-card-section class="overflow-hide">
        <div class="">
          <div class="double">
            <div class="filhos">
              <q-input
                class=""
                outlined
                v-model="title"
                label="title"
                lazy-rules
                :rules="[(val) => !!val || '']"
                type="text"
              />
            </div>
            <div class="filhos">
              <q-input
                class=""
                outlined
                v-model="price"
                label="price"
                type="text"
                lazy-rules
                :rules="[(val) => !!val || '']"
              />
            </div>
            <div class="one">
              <q-input
                class=""
                outlined
                v-model="description"
                label="description"
                type="text"
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
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="" label="cancelar" />
        <q-btn
          v-close-popup
          flat
          color="primary"
          round
          icon="save"
          @click="save()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useCursoStore } from 'src/stores/useCursoStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let title = ref('');
let _id = ref('');
let description = ref('');
let price = ref(0);
let bio = ref('');

let router = useRouter();
let cursos = ref([]);
let card = ref(false);
let cursoStore = useCursoStore();
let create = async () => {
  try {
    await cursoStore.getAll();
  } catch (e) {}
};
create();
let save = async () => {
  let dados = {
    _id: _id.value,
    title: title.value,
    description: description.value,
    price: price.value,
    bio: bio.value,
  };
  try {
    if (_id.value.length > 2) {
      await cursoStore.updateCurso(dados);
    } else {
      await cursoStore.createCurso(dados);
    }
  } catch (e) {
    return e;
  }
  create();
};
let openCurso = async (dados?: any) => {
  _id.value = '';
  title.value = '';
  description.value = '';
  price.value = 0;
  bio.value = '';
  if (dados?._id.length > 2) {
    _id.value = dados._id;
    title.value = dados.title;
    description.value = dados.description;
    price.value = dados.price;
    bio.value = dados.bio;
  }
  card.value = !card.value;
};

let deleteCurso = async (_id: string) => {
  await cursoStore.deleteCurso(_id);
  create();
};
</script>
<style scoped>
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

.card {
  width: 300px;
  height: 450px;
}
.description {
}
</style>
