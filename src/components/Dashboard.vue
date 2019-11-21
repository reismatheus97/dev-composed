<template>
  <v-container style="max-width: 1366px; padding-top: 64px;" class="transparent white--text">
    <v-layout align-center column>
      <v-flex mb-4 class="width100 text-center">
        <section class="display-3 font-weight-medium">
          1. <span class="blue--text">Choose your stack</span>
        </section>
        <v-sheet dark class="mx-auto my-8 transparent" elevation="0">
          <v-slide-group v-if="dockerImages" class="pa-4" multiple show-arrows :key="slideGroupKey">
            <v-slide-item v-for="(image, idx) in dockerImages" :key="idx"
              v-slot:default="{ active, toggle }"
            >
              <v-card :color="active ? 'blue darken-1' : 'grey'"
                class="ma-4 pa-8 elevation-3" width="300" @click="select(toggle, image)"
              >
                <v-row class="flex-column" align="center" justify="center">
                  <v-card-title class="headline">{{ image.name }}</v-card-title>
                    <v-avatar color="white" size="260" class="d-block">
                      <v-img contain :src="imgSrc(image.picture)"
                        width="180"
                      />
                    </v-avatar>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-flex>
      <v-scroll-y-transition>
        <v-flex my-8 mb-4 class="width100 text-center" v-if="selectedImages.length > 0">
          <section class="display-3 font-weight-medium mb-4">
            2. <span class="blue--text">Check default configurations</span>
          </section>
          <v-sheet dark class="mx-auto py-8 transparent" elevation="0">
            <v-carousel height="100%" class="align-center">
              <v-carousel-item v-for="(image, idx) in selectedImages" :key="idx">
                <v-layout wrap class="blue lighten-1 elevation-10 align-center">
                  <v-flex xs12 sm5>
                    <v-avatar size="200" color="white" class="mx-auto my-12 d-block elevation-10">
                      <v-img :src="imgSrc(image.picture)" width="140"
                        contain class="mx-auto"
                      ></v-img>
                    </v-avatar>
                  </v-flex>
                  <v-flex xs12 sm7>
                    <v-card height="200" color="transparent elevation-0">
                      <v-card-title class="display-1">
                        {{ image.name }}
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text v-if="image.ports"
                        class="headline text-left"
                      >
                        <b>Port:</b>
                        <span v-if="image.ports">{{ image.ports.join(", ") }}</span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-carousel-item>
            </v-carousel>
          </v-sheet>
        </v-flex>
      </v-scroll-y-transition>
      <v-scroll-y-transition>
        <v-flex my-8 mb-4 class="width100 text-center" v-if="selectedImages.length > 0">
          <section class="display-3 font-weight-medium mb-4">
            3. <span class="blue--text">Start managing your environment</span>
          </section>
          <v-layout py-12 wrap>
            <v-flex xs12>
              <v-data-table
                :headers="headers" dark
                :items="envImages"
                :items-per-page="8"
                class="elevation-0 custom-datatable"
                no-data-text="Nothing running here."
              >
                <template v-slot:item.status="{ item }">
                  <span>{{ item.status ? "On" : "Off" }}</span>
                </template>
                <template v-slot:item.ports="{ item }">
                  <span v-if="item.ports">{{ item.ports.join(", ") }}</span>
                </template>
                <template v-slot:footer="{ props }">
                  <v-layout wrap py-4>
                    <v-flex xs4>
                      <v-btn block min-width="150" height="48" color="light-blue elevation-4"
                        @click="checkEnv" :loading="loading" class="mx-3" text
                      >
                        <span class="headline light-blue--text">Refresh</span>
                      </v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-btn block min-width="150" height="48" color="green elevation-4"
                        @click="startMany" :loading="loading" class="mx-3" text
                      >
                        <span class="headline green--text">Start</span>
                      </v-btn>
                    </v-flex>
                    <v-flex xs4>
                      <v-btn block min-width="150" height="48" color="red elevation-4"
                        @click="dropAll" :loading="loading" class="mx-3" text
                      >
                        <span class="headline red--text">Stop</span>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-scroll-y-transition>
    </v-layout>
  </v-container>
</template>

<script>
import dockerImages from "@/database/docker-images"
import { upEnv, upAll, dropAll, checkEnv } from "@/database/dev-composer"

export default {
  name: 'Dashboard',

  data: () => ({
    slideGroupKey: 0,
    dockerImages,
    headers: [
      { text: "ID", value: "picture"},
      { text: "Status", value: "status" },
      { text: "Ports", value: "ports" }
    ],
    selectedImages: [],
    envImages: [],
    loading: false
  }),
  methods: {
    imgSrc (src) {
      return require('@/assets/img/docker-images/' + src)
    },
    select (callback, dockerImage) {
      callback()
      if (this.selectedImages.find(it => it.name === dockerImage.name)) {
        this.selectedImages = this.
          selectedImages.filter(it => it.name !== dockerImage.name)
      } else {
        this.selectedImages.push(dockerImage)
      }
    },
    async startMany () {
      try {
        this.loading = true
        await upEnv(this.selectedImages.map(it => it.name))
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
        await checkEnv()
      }
    },
    async startAll () {
      try {
        this.loading = true
        await upAll()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
        await checkEnv()
      }
    },
    async dropAll () {
      try {
        this.loading = true
        await dropAll()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
        this.selectedImages = []
        this.slideGroupKey = Date.now()
        await checkEnv()
      }
    },
    async checkEnv () {
      try {
        this.loading = true
        this.envImages = await checkEnv(this.selectedImages)
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    selectedImages: {
      handler() {
        this.envImages = []
      }
    }
  }
};
</script>

<style lang="scss">
  .vertical-middle {
    vertical-align: middle;
  }

  .actions {
    &__container {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  }

  .v-carousel__controls {
    background-color: transparent !important;
  }

  .custom-datatable {
    th {
      text-align: center !important;
      font-size: 16px !important;
    }

    td {
      font-size: 18px !important;
    }
  }
</style>