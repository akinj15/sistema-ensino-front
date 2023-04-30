<template>
  <q-page class="row justify-center q-pa-lg q-gutter-md">
    <div class="col-12">
      <div class="row q-mx-auto" style="max-width: 800px">
        <div class="text-h4 text-center col-12 text-dark">
          {{ orderStore.order.name }} -
          {{ orderStore.order.detail.aluno.userName }}
        </div>
        <div class="text-h6 text-center col-12 text-dark q-mt-md">
          Valor total:
          {{ orderStore.order.totalPrice }} $
        </div>
        <div class="text-h6 text-center col-12 text-dark q-mt-md">
          SubTotal:
          {{ valorSomado }} $
        </div>
        <div class="col-12 q-pa-md">
          <q-select
            outlined
            v-model="status"
            use-input
            input-debounce="0"
            label="Selecione o status"
            :options="['ABERTO', 'FECHADO', 'CANCELADO']"
            behavior="menu"
            class="select"
          />
        </div>

        <q-separator />
        <div class="col-12 q-pa-md row justify-end">
          <q-btn
            v-close-popup
            class="q-ml-md"
            color="primary"
            label="salvar"
            @click="salvar"
          />
        </div>
        <div class="col-12 row justify-center q-pa-md">
          <q-list bordered class="rounded-borders" style="width: 100%">
            <q-item-label header>frequencia</q-item-label>
            <q-separator inset="item" />
            <q-item
              clickable
              v-ripple
              v-for="title in orderStore.order.title"
              :key="title._id"
            >
              <q-item-section avatar>
                <q-avatar> {{ title.owned ? 'P' : 'N' }} </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{ title.info }}</q-item-label>
                <q-item-label caption lines="2">
                  <span class="text-weight-bold"
                    >{{ title.price }}
                    {{ title.discount ? ' - Descontado' : '' }}
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
  </q-page>
</template>

<script setup lang="ts">
import { useOrderStore } from 'src/stores/useOrderStore';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

let valorSomado = ref(0);
let status = ref('');

let route = useRoute();
let orderStore = useOrderStore();
const id: string = route.params.id;
let create = async () => {
  valorSomado.value = 0;
  try {
    await orderStore.getOrderById(id);
    let valor = 0;
    for (let i = 0; i < orderStore.order.title.length; i++) {
      if (!orderStore.order.title[i].discount) {
        valor += orderStore.order.title[i].price;
      }
    }
    valorSomado.value = valor;
  } catch (e) {}
};
create();

let salvar = async () => {
  if (status.value == 'FECHADO') {
    orderStore.order.status = status.value;
    for (let i = 0; i < orderStore.order.title.length; i++) {
      orderStore.order.title[i].owned = true;
    }
  }
  await orderStore.updateOrder(orderStore.order);
  return;
};
</script>
<style scoped>
.select {
  width: 100% !important;
}
</style>
