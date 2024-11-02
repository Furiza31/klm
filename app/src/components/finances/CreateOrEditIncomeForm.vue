<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IncomeAndOutcomeSchema } from "@/schemas/IncomeAndOutcomeSchema";
import { useTranslation } from "@/services/translation.service";
import { useForm } from "vee-validate";
import { ref } from "vue";

const { t } = useTranslation();
const isLoading = ref(false);

const formSchema = IncomeAndOutcomeSchema;

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <form @submit="onSubmit" class="p-4 w-full pb-1 space-y-4">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription> This is your public display name. </FormDescription>
      </FormItem>
    </FormField>
    <Button type="submit" class="mt-4 w-full">
      <LoaderCircle v-if="isLoading" class="size-6 animate-spin" />
      <span v-else>{{ t("Submit") }}</span>
    </Button>
  </form>
</template>
