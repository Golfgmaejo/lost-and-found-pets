<template>
  <v-navigation-drawer app width="295">
    <v-list>
      <v-list-item title="Navigation drawer" class="my-6">
        <v-card class="mx-auto" width="300">
          <v-list>
            <v-list-group value="Home" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-home"
                  title="หน้าหลัก"
                ></v-list-item>
              </template>
              <v-list-group value="gallery" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                  prepend-icon="mdi-image-multiple"
                    v-bind="props"
                    title="แกลอรี่"
                    to="/admin/gallery"
                  ></v-list-item>
                </template>
              </v-list-group>
            </v-list-group>
            <v-list-group value="Notice" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-dog-service"
                  title="ประกาศ"
                ></v-list-item>
              </template>
              <v-list-group value="lostpets" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-dog-service"
                    v-bind="props"
                    title="สัตว์เลี้ยงหาย"
                    to="/admin/pets/Editlostpets"
                  ></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="findowner" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-account-eye"
                    v-bind="props"
                    title="หาเจ้าของ"
                    to="/admin/pets/editfindowner"
                  ></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="adoptpet" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    prepend-icon="mdi-home-search"
                    v-bind="props"
                    title="หาบ้าน"
                    to="/admin/pets/editadoptpet"
                  ></v-list-item>
                </template>
              </v-list-group>
            </v-list-group>
            <v-list-group value="product" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-storefront"
                  title="สินค้า"
                  to="/admin/product"
                ></v-list-item>
              </template>
            </v-list-group>
            <v-list-group value="article" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-book-open-variant-outline"
                  title="บทความ"
                  to="/admin/article"
                ></v-list-item>
              </template>
            </v-list-group>
            <v-list-group value="Users" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-circle"
                  title="Users"
                  to="/admin/users"
                ></v-list-item>
              </template>
            </v-list-group>
          </v-list>
        </v-card>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar app title="Admin" style="background-color: #ffcc80">
    <v-spacer></v-spacer>
    <v-btn icon to="/">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
</script>
