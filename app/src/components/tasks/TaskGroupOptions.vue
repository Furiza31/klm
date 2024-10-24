<script setup lang="ts">
import CreateOrEditTaskGroup from "@/components/tasks/CreateOrEditTaskGroup.vue";
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
import { useAPI } from "@/services/API";
import { useTranslation } from "@/services/Translation";
import { TaskGroupType } from "@/types/TaskGroupType";
import { TaskType } from "@/types/TaskType";
import {
  BadgeX,
  LoaderCircle,
  Pen,
  RectangleEllipsis,
  Trash2,
} from "lucide-vue-next";
import { ref } from "vue";
import { toast } from "vue-sonner";

const { t } = useTranslation();
const api = useAPI();
const props = defineProps<{
  taskGroup: TaskGroupType | undefined;
  completedTasksNumber: number;
}>();
const emits = defineEmits([
  "onGroupDeleted",
  "onGroupDeletedAllCompletedTasks",
  "onTaskGroupUpdated",
]);
const isDrawerOpen = ref(false);
const isDeleteLoading = ref(false);
const isDeleteAllCompletedTasksLoading = ref(false);
const onDrawerStateChange = (isOpen: boolean) => {
  isDrawerOpen.value = isOpen;
};

const onGroupDelete = async () => {
  isDeleteLoading.value = true;
  try {
    const response = await api.delete(`/taskGroups/${props?.taskGroup?.id}`);
    isDrawerOpen.value = false;
    emits("onGroupDeleted", (response.data.taskGroup as TaskGroupType).id);
  } catch (error) {
    toast.error(t("Task_Group_Delete_Failed"));
    console.error(error);
    isDeleteLoading.value = false;
    return;
  }
  isDeleteLoading.value = false;
};

const onDeleteAllCompletedTasks = async () => {
  isDeleteAllCompletedTasksLoading.value = true;
  try {
    const response = await api.delete(
      `/taskGroups/${props?.taskGroup?.id}/completedTasks`
    );
    isDrawerOpen.value = false;
    emits("onGroupDeletedAllCompletedTasks", response.data.tasks as TaskType[]);
  } catch (error) {
    toast.error(t("Task_Group_Delete_All_Completed_Tasks_Failed"));
    console.error(error);
    isDeleteAllCompletedTasksLoading.value = false;
    return;
  }
  isDeleteAllCompletedTasksLoading.value = false;
};

const onTaskGroupUpdated = (group: TaskGroupType) => {
  isDrawerOpen.value = false;
  emits("onTaskGroupUpdated", group);
};
</script>

<template>
  <Drawer @update:open="onDrawerStateChange" :open="isDrawerOpen">
    <DrawerTrigger as-child>
      <Button size="icon">
        <RectangleEllipsis class="size-6" />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{{ t("Task_Group_Actions_Menu_Title") }}</DrawerTitle>
        <DrawerDescription>{{
          t("Task_Group_Actions_Menu_Description")
        }}</DrawerDescription>
      </DrawerHeader>
      <div
        class="p-4 w-full pb-2 flex flex-col gap-2 flex-nowrap justify-start items-center"
      >
        <Button
          class="flex flex-row flex-nowrap justify-start gap-2 w-full items-center"
          @click="onDeleteAllCompletedTasks"
          :disabled="props?.completedTasksNumber === 0"
        >
          <span v-if="!isDeleteAllCompletedTasksLoading">
            <BadgeX class="size-4" />
          </span>
          <span v-else>
            <LoaderCircle class="size-4 animate-spin" />
          </span>
          <span>
            {{ t("Task_Group_Actions_Menu_Delete_All_Completed_Tasks") }}
          </span>
        </Button>
        <CreateOrEditTaskGroup
          :taskGroup="props.taskGroup"
          @on-task-group-updated="onTaskGroupUpdated"
        >
          <Button
            class="flex flex-row flex-nowrap justify-start items-center gap-2 w-full"
            :disabled="props?.taskGroup?.title === 'Default'"
          >
            <span>
              <Pen class="size-4" />
            </span>
            <span>
              {{ t("Task_Group_Actions_Menu_Rename") }}
            </span>
          </Button>
        </CreateOrEditTaskGroup>
        <Button
          class="flex flex-row flex-nowrap justify-start gap-2 w-full items-center"
          variant="destructive"
          :disabled="props?.taskGroup?.title === 'Default'"
          @click="onGroupDelete"
        >
          <span v-if="!isDeleteLoading">
            <Trash2 class="size-4" />
          </span>
          <span v-else>
            <LoaderCircle class="size-4 animate-spin" />
          </span>
          <span>
            {{ t("Task_Group_Actions_Menu_Delete") }}
          </span>
        </Button>
      </div>
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
