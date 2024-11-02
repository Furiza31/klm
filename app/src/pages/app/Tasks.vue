<script setup lang="ts">
import CreateOrEditTask from "@/components/tasks/CreateOrEditTask.vue";
import CreateOrEditTaskGroup from "@/components/tasks/CreateOrEditTaskGroup.vue";
import TaskCard from "@/components/tasks/TaskCard.vue";
import TaskGroupCard from "@/components/tasks/TaskGroupCard.vue";
import TaskGroupOptions from "@/components/tasks/TaskGroupOptions.vue";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAPI } from "@/services/API.service";
import { useTranslation } from "@/services/translation.service";
import { TaskGroupType } from "@/types/TaskGroupType";
import { TaskType } from "@/types/TaskType";
import { FolderPlus, LoaderCircle, Plus } from "lucide-vue-next";
import { onMounted, ref, watch } from "vue";
import { toast } from "vue-sonner";

const isTaskGroupsLoading = ref(false);
const isTasksLoading = ref(false);
const api = useAPI();
const taskGroups = ref<TaskGroupType[]>([]);
const tasks = ref<TaskType[]>([]);
const selectedTaskGroupId = ref(0);
const { t } = useTranslation();

onMounted(async () => {
  try {
    isTaskGroupsLoading.value = true;
    isTasksLoading.value = true;
    const taskGroupsResponse = await api.get("/taskGroups");
    taskGroups.value = taskGroupsResponse.data.groups;
    selectedTaskGroupId.value = taskGroups.value.filter(
      (group) => group.title === "Default"
    )[0]?.id;
    isTaskGroupsLoading.value = false;
  } catch (error) {
    toast.error("Failed to fetch data");
    console.error(error);
  }
});

const requestTasks = async (selectedTaskGroupId: number) => {
  try {
    isTasksLoading.value = true;
    const tasksResponse = await api.get(
      `/taskGroups/${selectedTaskGroupId}/tasks`
    );
    tasks.value = tasksResponse.data.tasks as TaskType[];
    isTasksLoading.value = false;
  } catch (error) {
    toast.error("Failed to fetch tasks");
    console.error(error);
  }
};

watch(selectedTaskGroupId, async (newValue) => {
  await requestTasks(newValue);
});

watch(tasks, () => {
  tasks.value = tasks.value.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
});

watch(taskGroups, () => {
  taskGroups.value = taskGroups.value.sort(
    (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  );
});

const onTaskGroupChange = (groupId: number) => {
  selectedTaskGroupId.value = groupId;
};

const onTaskCreated = (task: TaskType) => {
  tasks.value = [task, ...tasks.value];
};

const onTaskGroupCreated = (group: TaskGroupType) => {
  taskGroups.value = [group, ...taskGroups.value];
  selectedTaskGroupId.value = group.id;
};

const onTaskDeleted = (taskId: number) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
};

const onTaskGroupDeleted = (groupId: number) => {
  const index = taskGroups.value.findIndex((group) => group.id === groupId);
  taskGroups.value = taskGroups.value.filter((group) => group.id !== groupId);
  selectedTaskGroupId.value =
    taskGroups.value[index]?.id || taskGroups.value[index - 1]?.id;
};

const onTaskGroupDeletedAllCompletedTasks = (deletedTasks: {
  count: number;
}) => {
  toast.success(
    t("Task_Group_Delete_All_Completed_Tasks_Success", {
      number: deletedTasks.count,
    })
  );
  tasks.value = tasks.value.filter((task) => !task.status);
};

const onTaskGroupUpdated = (group: TaskGroupType) => {
  const index = taskGroups.value.findIndex((g) => g.id === group.id);
  taskGroups.value[index] = group;
};

const onTaskUpdated = (task: TaskType) => {
  const index = tasks.value.findIndex((t) => t.id === task.id);
  tasks.value[index] = task;
};
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <div class="sticky h-16 w-full top-14 left-0 z-40">
      <ScrollArea class="pb-3">
        <div
          class="flex space-x-2 backdrop-blur-md rounded-b-md items-center py-2"
        >
          <CreateOrEditTaskGroup @on-task-group-created="onTaskGroupCreated">
            <Button variant="outline" size="icon">
              <FolderPlus class="size-6" />
            </Button>
          </CreateOrEditTaskGroup>
          <TaskGroupCard
            v-for="group in taskGroups"
            v-if="!isTaskGroupsLoading"
            :key="group.id"
            :group="group"
            :selected="group.id === selectedTaskGroupId"
            @on-task-group-change="onTaskGroupChange"
          />
          <LoaderCircle
            v-if="isTaskGroupsLoading"
            class="size-6 animate-spin"
          />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
    <div
      class="relative w-full flex flex-col gap-2 mb-14x"
      :class="{
        'h-[calc(100%_-_3.5rem)]': isTasksLoading || tasks.length === 0,
        'h-fit': !isTasksLoading && tasks.length > 0,
      }"
    >
      <TaskCard
        v-for="task in tasks"
        v-if="!isTasksLoading && tasks.length > 0"
        :key="task.id"
        :task="task"
        @on-task-deleted="onTaskDeleted"
        @on-task-updated="onTaskUpdated"
      />
      <div
        v-if="!isTasksLoading && tasks.length === 0"
        class="flex justify-center items-center h-full w-full"
      >
        <p class="text-muted-foreground">
          {{ t("Task_Group_Tasks_Not_Found") }}
        </p>
      </div>
      <div
        v-if="isTasksLoading"
        class="flex justify-center items-center h-full w-full"
      >
        <LoaderCircle class="size-12 animate-spin" />
      </div>
    </div>
    <div
      class="fixed bottom-4 w-full left-3 pr-6 flex flex-row flex-nowrap justify-between items-center"
    >
      <TaskGroupOptions
        :taskGroup="
          taskGroups.find((group) => group.id === selectedTaskGroupId)
        "
        :completed-tasks-number="tasks.filter((task) => task.status).length"
        @on-group-deleted="onTaskGroupDeleted"
        @on-group-deleted-all-completed-tasks="
          onTaskGroupDeletedAllCompletedTasks
        "
        @on-task-group-updated="onTaskGroupUpdated"
      />
      <CreateOrEditTask
        @on-task-created="onTaskCreated"
        :group-id="selectedTaskGroupId"
      >
        <Button size="icon">
          <Plus class="size-6" />
        </Button>
      </CreateOrEditTask>
    </div>
  </section>
</template>
