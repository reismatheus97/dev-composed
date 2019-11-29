<template>
  <v-app>
    <v-content class="grey darken-3">
      <v-app-bar
        color="#6A76AB" dark prominent
        :src="require('@/assets/img/app-bar-tcc.jpg')"
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props" gradient="to left bottom, rgb(72, 72, 72), #050315eb"></v-img>
        </template>
        <div class="custom-app-bar__title display-3 mb-2">
          Build your development environment quickly.
        </div>
      </v-app-bar>
      <dashboard/>
    </v-content>
  </v-app>
</template>

<script>
import Dashboard from './components/Dashboard';

export default {
  name: 'App',

  components: {
    Dashboard,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
  .custom-app-bar__title {
    width: 100%;
    align-self: flex-end;
    text-align: center;
  }
</style>
