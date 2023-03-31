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

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useMutation } from "@vue/apollo-composable";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    //Получение всех страниц
    const { onResult } = useQuery(
      gql`
        query {
          pages(perPage: 10, page: 1) {
            data {
              id
              parent_id
              page_type
              title
              content
              icon
              level
              is_public
              is_block
              position
              config
              created_at
              updated_at
              object {
                id
                type_id
              }
            }
            paginatorInfo {
              perPage
              count
              total
              currentPage
              from
              to
              lastPage
              hasMorePages
            }
          }
        }
      `
    );
    onResult((queryResult) => {
      console.log(queryResult.data);
    });

    //Получение всех типов
    {
      const { onResult } = useQuery(
        gql`
          {
            types(perPage: 10, page: 1) {
              data {
                id
                name
                label
                description
                system
                searchable
                id_ai
                author_id
                meta {
                  headline
                  icon
                }
                created_at
                updated_at
                properties {
                  id
                  name
                  data_type
                  label
                }
              }
              paginatorInfo {
                perPage
                currentPage
                lastPage
                total
                count
                from
                to
                hasMorePages
              }
            }
          }
        `
      );
      onResult((queryResult) => {
        console.log(queryResult.data);
      });
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
