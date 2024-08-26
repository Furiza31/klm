<script setup lang="ts">
import TaskForm from "@/components/tasks/TaskForm.vue";
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
import { TaskType } from "@/types/TaskType";
import { ref } from "vue";

const { t } = useTranslation();
const props = defineProps<{
  groupId: number;
  taskToEdit?: TaskType;
}>();
const isDrawerOpen = ref(false);
const emits = defineEmits(["onTaskCreated", "onTaskUpdated"]);

const onDrawerStateChange = (isOpen: boolean) => {
  isDrawerOpen.value = isOpen;
};

const onTaskCreated = (task: TaskType) => {
  emits("onTaskCreated", task);
  isDrawerOpen.value = false;
};

const onTaskUpdated = (task: TaskType) => {
  emits("onTaskUpdated", task);
  isDrawerOpen.value = false;
};
</script>

<template>
  <Drawer @update:open="onDrawerStateChange" :open="isDrawerOpen">
    <DrawerTrigger as-child>
      <slot />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{{
          props.taskToEdit ? t("Task_Edit_Title") : t("Task_Create_Title")
        }}</DrawerTitle>
        <DrawerDescription>{{
          props.taskToEdit
            ? t("Task_Edit_Description")
            : t("Task_Create_Description")
        }}</DrawerDescription>
      </DrawerHeader>
      <TaskForm
        :group-id="props.groupId"
        :task-to-edit="props.taskToEdit"
        @on-task-created="onTaskCreated"
        @on-task-updated="onTaskUpdated"
      />
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
