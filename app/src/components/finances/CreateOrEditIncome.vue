<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useTranslation } from "@/services/Translation";
import CreateOrEditIncomeForm from "./CreateOrEditIncomeForm.vue";

const { t } = useTranslation();
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <slot />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{{ t("Finances_New_Income_Form_Title") }}</DrawerTitle>
        <DrawerDescription>{{
          t("Finances_New_Income_Form_Title_Description")
        }}</DrawerDescription>
      </DrawerHeader>
      <CreateOrEditIncomeForm />
      <DrawerFooter class="pt-0">
        <DrawerClose as-child>
          <Button variant="destructive" class="w-full">
            {{ t("Cancel") }}
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
