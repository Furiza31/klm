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
import { useTranslation } from "@/services/translation.service";
import { TaskGroupType } from "@/types/TaskGroupType";
import { ref } from "vue";
import TaskGroupForm from "./TaskGroupForm.vue";

const props = defineProps<{
  taskGroup?: TaskGroupType;
}>();
const { t } = useTranslation();
const emits = defineEmits(["onTaskGroupCreated", "onTaskGroupUpdated"]);
const isDrawerOpen = ref(false);

const onDrawerStateChange = (isOpen: boolean) => {
  isDrawerOpen.value = isOpen;
};

const onTaskGroupCreated = (group: TaskGroupType) => {
  isDrawerOpen.value = false;
  emits("onTaskGroupCreated", group);
};

const onTaskGroupUpdated = (group: TaskGroupType) => {
  isDrawerOpen.value = false;
  emits("onTaskGroupUpdated", group);
};
</script>

<template>
  <Drawer @update:open="onDrawerStateChange" :open="isDrawerOpen">
    <DrawerTrigger as-child>
      <slot />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          {{
            props.taskGroup
              ? t("Task_Group_Edit_Title")
              : t("Task_Group_Create_Title")
          }}
        </DrawerTitle>
        <DrawerDescription>{{
          props.taskGroup
            ? t("Task_Group_Edit_Description")
            : t("Task_Group_Create_Description")
        }}</DrawerDescription>
      </DrawerHeader>
      <TaskGroupForm
        @on-task-group-created="onTaskGroupCreated"
        :task-group="props.taskGroup"
        @on-task-group-updated="onTaskGroupUpdated"
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
