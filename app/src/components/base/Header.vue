<script setup lang="ts">
import SideBar from "@/components/base/SideBar.vue";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const title = ref(route.name);
const backTo = ref(route.meta.backTo);

watch(
  () => route.name,
  (newVal) => {
    title.value = newVal;
  }
);

watch(
  () => route.meta.backTo,
  (newVal) => {
    backTo.value = newVal;
  }
);
</script>

<template>
  <header
    class="sticky top-0 left-0 h-14 w-full flex flex-row justify-between items-center p-3 backdrop-blur-md rounded-b-xl shadow-sm z-50"
  >
    <div>
      <Button v-if="backTo" variant="ghost" size="icon">
        <RouterLink :to="{ name: backTo as string }">
          <ArrowLeft class="size-7" />
        </RouterLink>
      </Button>
      <div v-else class="h-10 w-10"></div>
    </div>
    <div>
      <h1>{{ title }}</h1>
    </div>
    <SideBar />
  </header>
</template>
