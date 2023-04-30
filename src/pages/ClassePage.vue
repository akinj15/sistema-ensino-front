<template>
  <q-page class="row justify-evenly q-pa-lg q-gutter-md">
    <q-card
      v-for="classe in classeStore.classes"
      :key="classe._id"
      class="my-card card col-sm-12 col-md-4 col-lg-3"
      flat
      bordered
    >
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />

      <q-card-section style="height: 194px; overflow-y: auto">
        <div class="text-overline text-orange-9">
          alunos - {{ classe.students.length }}
        </div>
        <div class="text-h5 q-mt-sm q-mb-xs">
          turma - {{ classe.classeName }}
        </div>
        <div class="text-caption text-grey description">
          {{ classe.description }}
        </div>
      </q-card-section>

      <q-card-actions class="q-mt-auto">
        <q-btn
          flat
          color="primary"
          label="Frequencia"
          @click="frequencia(classe._id)"
        />
        <q-space />
        <q-btn
          color="grey"
          round
          flat
          dense
          icon="edit"
          @click="createClasse(classe)"
        />
      </q-card-actions>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[25, 25]">
      <q-btn fab icon="add" color="primary" @click="createClasse()" />
    </q-page-sticky>
  </q-page>

  <q-dialog v-model="card">
    <q-card class="my-card dialog">
      <q-card-section class="">
        <div class="conteudo">
          <div class="double">
            <div class="filhos">
              <q-input
                class=""
                outlined
                v-model="classeName"
                label="Nome da classe"
                lazy-rules
                :rules="[(val) => !!val || '']"
                type="text"
              />
            </div>
            <div class="filhos">
              <q-input
                class=""
                outlined
                disable
                v-model="price"
                label="Preço"
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
                label="Descrição"
                type="text"
                lazy-rules
                :rules="[(val) => !!val || '']"
              />
            </div>
            <div class="one">
              <q-select
                outlined
                v-model="curso"
                use-input
                input-debounce="0"
                label="Simple filter"
                :options="cursoStore.cursos"
                behavior="menu"
                emit-value
                option-label="title"
                v-on:update:model-value="montaPreco()"
              />
            </div>
            <div class="one">
              <div class="text-overline">Aulas agendadas</div>
              <q-card-section>
                <div>
                  <q-badge
                    v-for="grid in gridCard"
                    :key="grid.dateScheduled"
                    color="purple"
                    text-color="white"
                    class="q-ma-sm"
                  >
                    {{ grid.dateScheduled }}
                  </q-badge>
                </div>
              </q-card-section>
            </div>

            <div class="one row justify-evenly">
              <q-date
                v-model="gridDate"
                mask="YYYY-MM-DD HH:mm"
                class="q-mt-md"
                color="primary"
              />
              <q-time
                class="q-mt-md"
                v-model="gridDate"
                mask="YYYY-MM-DD HH:mm"
                color="primary"
              />
            </div>
            <div class="one q-my-md">
              <q-btn
                class="full-width"
                color="primary"
                label="Reserve"
                @click="addDate"
              />
            </div>
            <div class="one">
              <div class="text-overline">Alunos</div>
              <q-card-section>
                <div>
                  <q-badge
                    v-for="student in students"
                    :key="student._id"
                    color="purple"
                    text-color="white"
                    class="q-ma-sm"
                  >
                    {{ student.userName }}
                  </q-badge>
                </div>
              </q-card-section>
              <q-card-section class="row">
                <div class="col-xs-10 col-sm-10 col-md-11 col-lg-11 q-pr-md">
                  <q-select
                    outlined
                    v-model="studentSelected"
                    use-input
                    input-debounce="0"
                    label="Selecione os alunos"
                    :options="studentsList"
                    @filter="filterFn"
                    behavior="menu"
                    emit-value
                    map-options
                    option-label="userName"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          sem resultados
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div
                  class="col-xs-2 col-sm-2 col-md-1 col-lg-1 text-right q-pt-sm"
                >
                  <q-btn color="primary" round icon="add" @click="addAluno()" />
                </div>
              </q-card-section>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="buttons">
        <q-btn
          v-close-popup
          color="red"
          label=""
          icon="delete"
          @click="deleteCurso"
        />
        <q-btn
          v-close-popup
          color="primary"
          label="salvar"
          icon="save"
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import Grid from 'src/models/Grid';
import { useClasseStore } from 'src/stores/useClasseStore';
import { useLoginStore } from 'src/stores/useLoginStore';
import { useCursoStore } from 'src/stores/useCursoStore';
import { useOrderStore } from 'src/stores/useOrderStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

let _id = ref('');
let classeName = ref('');
let description = ref('');
let price = ref(0);
let students = ref();
let curso = ref();
let studentSelected = ref();
let studentsList = ref();
let gridDate = ref('');
let fullGrid: { dateScheduled: string; info: string; classHeld: boolean }[] =
  [];
let gridCard = ref();

let router = useRouter();
let cursos = ref([]);
let card = ref(false);
let classeStore = useClasseStore();
let userStore = useLoginStore();
let cursoStore = useCursoStore();
let orderStore = useOrderStore();
let create = async () => {
  try {
    await classeStore.getAll();
    await userStore.geTodes();
    await cursoStore.getAll();
  } catch (e) {}
};
create();
let save = async () => {
  try {
    if (_id.value.length > 2) {
      let envio = {
        _id: _id.value,
        classeName: classeName.value,
        description: description.value,
        curso: curso.value,
        price: price.value,
        grid: gridCard.value,
        students: students.value,
      };
      await classeStore.updateClasse(envio);
    } else {
      let envio = {
        classeName: classeName.value,
        description: description.value,
        curso: curso.value,
        price: price.value,
        grid: gridCard.value,
        students: students.value,
      };
      await classeStore.createClasses(envio);

      for (let i = 0; i < students.value.length; i++) {
        console.log('valor do curso', price.value / students.value.length);
        let valorTitulos = price.value / gridCard.value.length;
        let title = [];
        for (let j = 0; j < gridCard.value.length; j++) {
          title.push({
            price: valorTitulos,
            info: 'parcela ' + j + 1,
            owned: false,
            discount: false,
          });
        }
        console.log(title, 22);
        await orderStore.createOrder({
          title: title,
          name: classeName.value,
          description: description.value,
          owner: students.value[i]._id,
          product: classeStore.classe._id,
          totalPrice: price.value,
          status: 'ABERTO',
          detail: {
            curso: curso.value,
            aluno: students.value[i],
          },
        });
      }
    }
  } catch (e) {
    return e;
  }
  create();
};
let createClasse = async (dados?: any) => {
  gridCard.value = [];
  _id.value = '';
  classeName.value = '';
  description.value = '';
  curso.value = null;
  price.value = 0;
  gridCard.value = [];
  students.value = [];
  if (dados?._id.length > 2) {
    _id.value = dados._id;
    classeName.value = dados.classeName;
    description.value = dados.description;
    price.value = dados.price;
    curso.value = dados.curso;
    gridCard.value = dados.grid;
    students.value = dados.students;
  }
  card.value = !card.value;
  create();
};

let addDate = async () => {
  let datas = {
    dateScheduled: gridDate.value,
    info: 'data agendada',
    classHeld: false,
  };
  fullGrid.push(datas);
  gridCard.value = fullGrid;
  gridDate.value = '';
};

let filterFn = (val: any, update: any) => {
  if (val === '') {
    update(() => {
      studentsList.value = userStore.users;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    studentsList.value = userStore.users.filter(
      (v) => v.userName.toLowerCase().indexOf(needle) > -1
    );
  });
};

let addAluno = async () => {
  students.value.push(studentSelected.value);
};

let deleteCurso = async () => {
  let classHeld = gridCard.value.find((val: any) => val.classHeld == true);
  if (_id.value.length > 2 && classHeld) {
    await classeStore.deleteClasse(_id.value);
  }
  await create();
};

let montaPreco = async () => {
  price.value = curso.value.price;
};

let frequencia = async (id: string) => {
  if (id) {
    router.push({ path: '/classe/' + id });
  }
};
</script>
<style scoped>
.dialog {
  width: 90vw !important;
  max-width: 900px;
  height: 85vh;
  overflow: ;
}

.double {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.conteudo {
  overflow-y: auto;
  height: 90%;
}

.buttons {
  height: 10%;
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
