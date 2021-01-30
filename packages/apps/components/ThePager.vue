<template>
  <v-footer color="rgba(0, 0, 0, 0.0)">
    <v-row class="mt-2 justify-center">
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="pageLength"
          circle
          @input="inputPage"
        ></v-pagination>
      </div>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class ThePager extends Vue {
  @Prop({ type: Number, default: 1 }) propPage!: number
  @Prop({ type: Number, default: 1 }) pageLength!: number
  @Prop({ type: Function, required: true }) inputPage!: Function

  get page(): number {
    return this.propPage;
  }

  set page(val: number) {}
}
</script>
