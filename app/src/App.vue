<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import { RouterView } from "vue-router";
</script>

<template>
  <Toaster richColors position="bottom-center" />
  <RouterView v-slot="{ Component }">
    <section class="h-full w-full">
      <Component :is="Component" />
    </section>
  </RouterView>
</template>
