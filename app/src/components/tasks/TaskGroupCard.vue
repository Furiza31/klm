<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/services/translation.service";
import { TaskGroupType } from "@/types/TaskGroupType";

const props = defineProps<{
  group: TaskGroupType;
  selected: boolean;
}>();
const emits = defineEmits(["onTaskGroupChange"]);
const { t } = useTranslation();
const onTaskGroupChange = () => {
  if (props.selected) return;
  emits("onTaskGroupChange", props.group.id);
};
</script>

<template>
  <Button
    @click="onTaskGroupChange"
    :variant="props.selected ? 'default' : 'outline'"
  >
    {{
      props.group.title === "Default"
        ? t("Task_Group_Name_Default")
        : props.group.title
    }}
  </Button>
</template>
