<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title clickable to="/index"> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> menu </q-item-label>
        <q-item clickable v-ripple to="/user">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section> user </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="sair">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> sair </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const leftDrawerOpen = ref(Boolean(false));
    const router = useRouter();
    const sair = async () => {
      window.localStorage.clear();
      router.push({ path: '/' });
    };
    return {
      sair,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
