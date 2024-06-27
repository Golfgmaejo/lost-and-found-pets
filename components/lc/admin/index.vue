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
                  <v-list-item v-bind="props" title="แกลอรี่"></v-list-item>
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
              <v-list-group value="notice1" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    title="สัตว์เลี้ยงหาย"
                  ></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="findowner" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="หาเจ้าของ"></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="adoptpet" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="หาบ้าน"></v-list-item>
                </template>
              </v-list-group>
            </v-list-group>
            <v-list-group value="shop" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-storefront"
                  title="สินค้า"
                ></v-list-item>
              </template>
              <v-list-group value="dog" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="สุนัข"></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="cat" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="แมว"></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="magica" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="สัตว์พิเศษ"></v-list-item>
                </template>
              </v-list-group>
              <v-list-group value="allproduct" v-model="open">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" title="ทั้งหมด"></v-list-item>
                </template>
              </v-list-group>
            </v-list-group>
            <v-list-group value="article" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-book-open-variant-outline"
                  title="บทความ"
                ></v-list-item>
              </template>
            </v-list-group>
            <v-list-group value="Users" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  prepend-icon="mdi-account-circle"
                  title="Users"
                ></v-list-item>
              </template>
            </v-list-group>
          </v-list>
        </v-card>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar app dark prominent style="background-color: #ffcc80">
    <v-toolbar-title>Admin</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
  <v-main>
    <v-container fluid class="pa-0 fill-height">
      
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(['Home', 'Notice', 'shop', 'article', 'Users']) // Default opened groups
</script>
