<template>
  <v-app>
    <v-content>
      <v-app-bar
        color="#6A76AB" dark prominent
        :src="require('@/assets/img/app-bar-tcc.jpg')"
        fade-img-on-scroll
      >
        <template v-slot:img="{ props }">
          <v-img v-bind="props"
            gradient="to left bottom, #484848d9, #173469e8"
          ></v-img>
        </template>
        <div class="custom-app-bar__title display-1">
          Build your development environment quickly.
        </div>
      </v-app-bar>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
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
