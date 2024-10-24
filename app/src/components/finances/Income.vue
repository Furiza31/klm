<script setup lang="ts">
import CreateOrEditIncome from "@/components/finances/CreateOrEditIncome.vue";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/services/Translation";
import { Plus } from "lucide-vue-next";

const { t } = useTranslation();
</script>

<template>
  <section class="w-full h-full">
    <CreateOrEditIncome cash-flow="income">
      <Button class="w-full flex flex-row items-center justify-center gap-2">
        <Plus /> <span>{{ t("Finances_New_Income") }}</span>
      </Button>
    </CreateOrEditIncome>
  </section>
</template>
