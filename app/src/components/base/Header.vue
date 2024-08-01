<script setup lang="ts">
import SideBar from "@/components/base/SideBar.vue";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/services/Translation";
import { ArrowLeft } from "lucide-vue-next";
import { ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const title = ref(route.name);
const backTo = ref(route.meta.backTo);
const { t } = useTranslation();

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
      <transition name="slide-up" mode="out-in">
        <h1 :key="title!.toString()">{{ t(title!.toString()) }}</h1>
      </transition>
    </div>
    <SideBar />
  </header>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.15s ease;
}

.slide-up-enter-from {
  filter: blur(1.5px);
  opacity: 0;
  transform: translateY(10px);
}
.slide-up-leave-to {
  filter: blur(1.5px);
  opacity: 0;
  transform: translateY(-10px);
}
</style>
