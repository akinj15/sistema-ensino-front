<template>
  <q-page class="row justify-center q-pa-lg q-gutter-md">
    <div class="col-12">
      <div class="row q-mx-auto" style="max-width: 800px">
        <div class="text-h4 text-center col-12 text-dark">
          Frequencia da turma: {{ classeStore.classe.classeName }}
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 q-pa-md">
          <q-select
            outlined
            v-model="aluno"
            use-input
            input-debounce="0"
            label="Selecionar aluno"
            :options="classeStore.classe.students"
            behavior="menu"
            emit-value
            class="select"
            option-label="userName"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 q-pa-md">
          <q-select
            outlined
            v-model="grid"
            use-input
            input-debounce="0"
            label="Selecionar aula"
            :options="classeStore.classe.grid"
            behavior="menu"
            emit-value
            option-label="dateScheduled"
          />
        </div>
        <div class="col-12 q-pa-md">
          <q-input
            class=""
            outlined
            v-model="justificativa"
            label="justificativa de falta"
            type="text"
            lazy-rules
            :rules="[(val) => !!val || '']"
          />
        </div>
        <q-separator />
        <div class="col-12 q-pa-md row justify-end">
          <q-btn v-close-popup color="red" label="falta" @click="createFalta" />
          <q-btn
            v-close-popup
            class="q-ml-md"
            color="primary"
            label="presença"
            @click="createPresenca"
          />
        </div>
        <div class="col-12 row justify-center q-pa-md">
          <q-list
            v-if="checkPointStore.checkPoints.length"
            bordered
            class="rounded-borders"
            style="width: 100%"
          >
            <q-item-label header>frequencia</q-item-label>
            <q-separator inset="item" />
            <q-item
              clickable
              v-ripple
              v-for="checkPoint in checkPointStore.checkPoints"
              :key="checkPoint._id"
            >
              <q-item-section avatar>
                <q-avatar> {{ checkPoint.present ? 'P' : 'F' }} </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ checkPoint.userName }}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold"
                    >{{ new Date(checkPoint.scheduled).toDateString() }} -
                    {{ checkPoint.info }}
                  </span>
                </q-item-label>
              </q-item-section>

              <q-item-section side top> </q-item-section>
            </q-item>

            <q-separator inset="item" />
          </q-list>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[25, 25]">
      <q-btn fab icon="undo" color="primary" to="/classe" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import Grid from 'src/models/Grid';
import { useClasseStore } from 'src/stores/useClasseStore';
import { useCheckPointStore } from 'src/stores/useCheckPointStore';
import { useOrderStore } from 'src/stores/useOrderStore';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let _id = ref('');
let aluno = ref();
let grid = ref();
let justificativa = ref('');
let fullGrid: { dateScheduled: string; info: string; classHeld: boolean }[] =
  [];
let gridCard = ref();

let route = useRoute();
let card = ref(false);
let classeStore = useClasseStore();
let checkPointStore = useCheckPointStore();
let orderStore = useOrderStore();
const id: string = route.params.id;
let create = async () => {
  try {
    await classeStore.getClasseId(id);
    await checkPointStore.getCheckPoint(id);
  } catch (e) {}
};
create();
let createPresenca = async () => {
  try {
    if (aluno.value._id.length > 2) {
      let alunoMarcado = checkPointStore.checkPoints.find((val) => {
        return val.moment == grid.value._id && val.user == aluno.value._id;
      });
      if (alunoMarcado) {
        return;
      }
      let envio = {
        user: aluno.value._id,
        userName: aluno.value.userName,
        moment: grid.value._id,
        classe: id,
        scheduled: grid.value.dateScheduled,
        grid: gridCard.value,
        info: justificativa.value,
        present: true,
      };
      await checkPointStore.createCheckPoint(envio);
    }
    create();
  } catch (e) {
    return e;
  }
};
let createFalta = async () => {
  try {
    if (aluno.value._id.length > 2) {
      let alunoMarcado = checkPointStore.checkPoints.find((val) => {
        return val.moment == grid.value._id && val.user == aluno.value._id;
      });
      if (alunoMarcado) {
        console.log('perdeu');
        return;
      }
      let envio = {
        user: aluno.value._id,
        userName: aluno.value.userName,
        moment: grid.value._id,
        classe: id,
        scheduled: grid.value.dateScheduled,
        grid: gridCard.value,
        info: justificativa.value,
        present: false,
      };
      await checkPointStore.createCheckPoint(envio);
      await orderStore.getOrder(aluno.value._id, classeStore.classe._id);
      for (let i = 0; !i < orderStore.orders[0].title.length; i++) {
        if (!orderStore.orders[0].title[i].discount) {
          orderStore.orders[0].title[i].discount = true;
          orderStore.orders[0].title[i].owned = true;
          break;
        }
      }
      await orderStore.updateOrder(orderStore.orders[0]);
    }
  } catch (e) {
    return e;
  }
  create();
};

let deleteCurso = async () => {
  let classHeld = gridCard.value.find((val: any) => val.classHeld == true);
  if (_id.value.length > 2 && classHeld) {
    await classeStore.deleteClasse(_id.value);
  }
  await create();
};
</script>
<style scoped>
.select {
  width: 100% !important;
}
</style>
