<script setup lang="ts">
import { useTranslation } from "@/services/Translation";

const { t } = useTranslation();
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <h1>{{ t("Tasks") }}</h1>
  </section>
</template>
