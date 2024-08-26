<script setup lang="ts">
import CreateOrEditTask from "@/components/tasks/CreateOrEditTask.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAPI } from "@/services/API";
import { useTranslation } from "@/services/Translation";
import { TaskType } from "@/types/TaskType";
import { DateFormatter } from "@internationalized/date";
import {
  CalendarDays,
  Clock,
  Ellipsis,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import { toast } from "vue-sonner";

const props = defineProps<{
  task: TaskType;
}>();
const emits = defineEmits(["onTaskUpdated", "onTaskDeleted"]);
const api = useAPI();
const isDropDownMenuOpen = ref(false);

const handleCheckUpdate = async (checked: boolean) => {
  isLoading.value = true;
  try {
    await api.put(`/taskGroups/${props.task.groupId}/tasks/${props.task.id}`, {
      status: checked,
    });
    props.task.status = checked;
  } catch (error) {
    console.error(error);
    toast.error(t("Task_Update_Failed"));
    props.task.status = !checked;
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
};

const { locale, t } = useTranslation();
const isLoading = ref(false);
const df = new DateFormatter(locale.value, {
  dateStyle: "long",
});

const dueTime = computed(() => {
  if (!props.task.dueTime) return null;

  const date = new Date(props.task.dueTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
});

const onTaskDelete = async () => {
  isLoading.value = true;
  try {
    const response = await api.delete(
      `/taskGroups/${props.task.groupId}/tasks/${props.task.id}`
    );
    emits("onTaskDeleted", (response.data.task as TaskType).id);
  } catch (error) {
    console.error(error);
    toast.error(t("Task_Delete_Failed"));
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
};

const onTaskUpdated = (task: TaskType) => {
  emits("onTaskUpdated", task);
  isDropDownMenuOpen.value = false;
};

const onDropDownMenuStateChange = (isOpen: boolean) => {
  isDropDownMenuOpen.value = isOpen;
};
</script>

<template>
  <div
    class="flex flex-row flex-nowrap justify-start items-start gap-2 w-full py-1 task_apear"
  >
    <Checkbox
      v-if="!isLoading"
      class="size-6"
      v-model:checked="props.task.status"
      @update:checked="handleCheckUpdate"
    />
    <LoaderCircle v-if="isLoading" class="size-6 animate-spin" />
    <div
      class="flex flex-nowrap w-full justify-start flex-col items-start text-md"
      :class="{
        'line-through': props.task.status,
        'opacity-50': props.task.status,
      }"
    >
      <div
        class="flex flex-row gap-2 flex-nowrap items-center justify-between w-full"
      >
        <div>
          <h1>{{ props.task.title }}</h1>
          <div
            class="flex flex-row gap-2 flex-nowrap items-center justify-start"
          >
            <Badge
              v-if="props.task.dueDate"
              class="mt-1 flex flex-row gap-1 items-center justify-start"
            >
              <CalendarDays class="size-3" />
              <span class="text-xs">{{
                df.format(new Date(props.task.dueDate))
              }}</span>
            </Badge>
            <Badge
              v-if="props.task.dueTime"
              class="mt-1 flex flex-row gap-1 items-center justify-start"
            >
              <Clock class="size-3" />
              <span class="text-xs">{{ dueTime }}</span>
            </Badge>
          </div>
        </div>
        <DropdownMenu
          @update:open="onDropDownMenuStateChange"
          :open="isDropDownMenuOpen"
        >
          <DropdownMenuTrigger>
            <Ellipsis class="size-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            class="gap-1 flex flex-col justify-start items-stretch"
          >
            <DropdownMenuLabel class="p-1 text-center">
              {{ t("Task_Action_Menu_Title") }}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <CreateOrEditTask
              :group-id="props.task.groupId"
              :task-to-edit="props.task"
              @on-task-updated="onTaskUpdated"
            >
              <Button
                class="flex flex-row flex-nowrap gap-2 justify-center items-center p-0 cursor-pointer"
                size="sm"
              >
                <span>
                  <Pencil class="size-4" />
                </span>
                <span>
                  {{ t("Task_Action_Menu_Edit") }}
                </span>
              </Button>
            </CreateOrEditTask>
            <Button
              variant="destructive"
              class="flex flex-row flex-nowrap gap-2 justify-center items-center p-0 cursor-pointer"
              size="sm"
              @click="onTaskDelete"
            >
              <span>
                <Trash2 class="size-4" />
              </span>
              <span>
                {{ t("Task_Action_Menu_Delete") }}
              </span>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Accordion
        type="single"
        collapsible
        class="w-full"
        v-if="props.task.description"
      >
        <AccordionItem value="description" class="border-b-0">
          <AccordionTrigger class="text-muted-foreground text-xs py-1">{{
            t("Task_More_Details")
          }}</AccordionTrigger>
          <AccordionContent class="text-sm text-justify">
            {{ props.task.description }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</template>

<style scoped>
.task_apear {
  animation-name: taskApear;
  animation-duration: 200ms;
}

@keyframes taskApear {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
