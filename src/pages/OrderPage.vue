<template>
  <q-page class="row justify-evenly q-pa-lg q-gutter-md">
    <q-card
      v-for="order in orderStore.orders"
      :key="order._id"
      class="my-card card col-sm-12 col-md-4 col-lg-3"
      flat
      bordered
      @click="pendencias(order._id)"
    >
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

      <q-card-section style="height: 240px; overflow-y: auto">
        <div class="text-overline text-orange-9">
          {{ order.detail.aluno.userName }}
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">
          Curso - {{ order.detail.curso.title }}
        </div>
        <div class="text-caption text-grey description">
          {{ order.totalPrice }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useOrderStore } from 'src/stores/useOrderStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter();
let orderStore = useOrderStore();
let create = async () => {
  try {
    await orderStore.getAll();
  } catch (e) {}
};
create();
let pendencias = async (id: string) => {
  if (id) {
    router.push({ path: '/order/' + id });
  }
};
</script>
<style scoped>
.dialog {
  width: 90vw !important;
  max-width: 900px;
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

.card {
  width: 300px;
  height: 450px;
}
.description {
  height: 80px;
  overflow: hidden;
}
</style>
