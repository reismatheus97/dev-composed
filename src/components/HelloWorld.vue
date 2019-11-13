<template>
  <v-container style="max-width: 1366px" class="py-12">
    <v-layout align-center column>
      <v-flex mb-4 class="width100 text-center">
        <section class="display-2 font-weight-medium">
          1. <span class="blue--text">Choose your stack</span>
        </section>
        <v-sheet class="mx-auto my-8"
          elevation="8" max-width="800"
        >
          <v-slide-group class="pa-4" multiple show-arrows>
            <v-slide-item v-for="n in 9" :key="n"
              v-slot:default="{ active, toggle }"
            >
              <v-card :color="active ? 'blue' : '#6a76ab24'"
                class="ma-4" height="200" width="100" @click="toggle"
              >
                <v-row class="fill-height"
                  align="center" justify="center"
                >
                  <v-scale-transition>
                    <v-img :src="require('@/assets/img/docker-images/golang.png')"/>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-flex>
      <!-- <v-flex mb-4>
        <section class="display-3">
          1. <span class="blue--text">Choose your stack</span>
        </section>
      </v-flex>
      <v-flex mb-4>
        <section class="display-3">
          1. <span class="blue--text">Choose your stack</span>
        </section>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    
  }),
};
</script>
