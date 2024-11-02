<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/services/translation.service";
import { Plus } from "lucide-vue-next";

const { t } = useTranslation();
</script>

<template>
  <Button
    variant="outline"
    class="w-full flex flex-row items-center justify-center gap-2 text-destructive hover:text-destructive"
  >
    <Plus /> <span>{{ t("Finances_New_Outcome") }}</span>
  </Button>
</template>
