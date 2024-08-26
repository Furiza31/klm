<script setup lang="ts">
import { TaskGroupSchema } from "@/schemas/TaskGroupSchema";
import { useTranslation } from "@/services/Translation";
import { LoaderCircle } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { onMounted, ref } from "vue";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAPI } from "@/services/API";
import { TaskGroupType } from "@/types/TaskGroupType";
import { toast } from "vue-sonner";

const isLoading = ref(false);
const api = useAPI();
const emits = defineEmits(["onTaskGroupCreated", "onTaskGroupUpdated"]);
const formSchema = TaskGroupSchema;
const { t } = useTranslation();
const isValueDefault = ref(false);
const form = useForm({
  validationSchema: formSchema,
});
const props = defineProps<{
  taskGroup?: TaskGroupType;
}>();

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    let response;
    if (!props.taskGroup) {
      response = await api.post("/taskGroups", values);
      emits("onTaskGroupCreated", response.data.group as TaskGroupType);
    } else {
      response = await api.put(`/taskGroups/${props.taskGroup.id}`, values);
      emits("onTaskGroupUpdated", response.data.group as TaskGroupType);
    }
  } catch (error) {
    toast.error(t("Task_Group_Form_Failed"));
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
});

const onInputChange = () => {
  isValueDefault.value = form.values.title === "Default";
};

onMounted(() => {
  if (props.taskGroup) {
    form.setValues(props.taskGroup);
  }
});
</script>

<template>
  <form @submit="onSubmit" class="p-4 w-full pb-1 space-y-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormControl>
          <Input
            type="text"
            :placeholder="t('Task_Group_Form_Field_Title')"
            v-bind="componentField"
            @input="onInputChange"
            autofocus
          />
        </FormControl>
        <FormMessage
          class="animate-in"
          :message="t('Task_Group_Form_Field_Error_Title')"
        />
      </FormItem>
    </FormField>
    <Button type="submit" class="mt-4 w-full" :disabled="isValueDefault">
      <LoaderCircle v-if="isLoading" class="size-6 animate-spin" />
      <span v-else>{{ t("Submit") }}</span>
    </Button>
  </form>
</template>
