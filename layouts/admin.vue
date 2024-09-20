<template>
  <v-card>
    <v-layout >
      <v-navigation-drawer expand-on-hover rail app class="background-image">
        <v-list class="my-16">
          <v-list-item
            prepend-avatar="https://static.vecteezy.com/system/resources/thumbnails/009/636/683/small_2x/admin-3d-illustration-icon-png.png"
            subtitle="LostAndFoundPets@gmailcom"
            title="AdminLAFP"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list density="compact" nav>
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
                  to="/admin/pets/lostpets"
                ></v-list-item>
              </template>
            </v-list-group>
            <v-list-group value="findowner" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  prepend-icon="mdi-account-eye"
                  v-bind="props"
                  title="หาเจ้าของ"
                  to="/admin/pets/findowner"
                ></v-list-item>
              </template>
            </v-list-group>
            <v-list-group value="adoptpet" v-model="open">
              <template v-slot:activator="{ props }">
                <v-list-item
                  prepend-icon="mdi-home-search"
                  v-bind="props"
                  title="หาบ้าน"
                  to="/admin/pets/adoptpet"
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

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            to="/"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="main-content">
        <slot />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  layout: 'admin',
};
</script>

<style scoped>
.main-content {
  margin-left: 80px;
  transition: margin-left 0.3s ease;
  background-color: #ffffff;
  min-height: 100vh;
}
.v-navigation-drawer--rail:hover ~ .main-content {
  margin-left: 256px;
}
.background-image {   
  background-image: url('public/images/logos/bg-pets.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
