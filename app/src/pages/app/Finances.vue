<script setup lang="ts">
import Bank from "@/components/finances/Bank.vue";
import Income from "@/components/finances/Income.vue";
import Outcome from "@/components/finances/Outcome.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/services/Translation";
import { ArrowDownToDot, ArrowUpFromDot, PiggyBank } from "lucide-vue-next";

const { t } = useTranslation();
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <Tabs default-value="income" class="w-full">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger
          value="income"
          class="flex flex-row flex-nowrap items-center justify-center gap-2"
        >
          <ArrowDownToDot class="size-5" />
          <span>{{ t("Finances_Income") }}</span>
        </TabsTrigger>
        <TabsTrigger
          value="outcome"
          class="flex flex-row flex-nowrap items-center justify-center gap-2"
        >
          <ArrowUpFromDot class="size-5" />
          <span>{{ t("Finances_Outcome") }}</span>
        </TabsTrigger>
        <TabsTrigger
          value="bank"
          class="flex flex-row flex-nowrap items-center justify-center gap-2"
        >
          <PiggyBank class="size-5" />
          <span>
            {{ t("Finances_Bank") }}
          </span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="income"> <Income /> </TabsContent>
      <TabsContent value="outcome"> <Outcome /> </TabsContent>
      <TabsContent value="bank"> <Bank /> </TabsContent>
    </Tabs>
  </section>
</template>
