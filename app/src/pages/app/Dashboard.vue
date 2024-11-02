<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAPI } from "@/services/API.service";
import { useTranslation } from "@/services/translation.service";
import { TaskType } from "@/types/TaskType";
import { CircleCheck, ListTodo, LoaderCircle } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";

const { t } = useTranslation();

const completedTasks = computed(() =>
  tasks.value.filter((task) => task.status)
);
const tasks = ref<TaskType[]>([]);
const isTasksLoading = ref(true);
const api = useAPI();

onMounted(async () => {
  try {
    const tasksResponse = await api.get("/allTasks");
    tasks.value = tasksResponse.data.tasks as TaskType[];
    isTasksLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <section class="h-full w-full bg-background p-3">
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader
          class="flex flex-row items-center justify-between space-y-0 pb-2"
        >
          <CardTitle class="text-sm font-medium"> {{ t("Tasks") }} </CardTitle>
          <ListTodo class="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold">
            <span v-if="isTasksLoading">
              <LoaderCircle class="size-7 animate-spin" />
            </span>
            <span
              class="text-lg font-bold flex flex-row flex-nowrap items-center justify-start gap-2"
              v-if="!isTasksLoading && tasks.length == completedTasks.length"
            >
              <span>{{ t("Dashboard_All_Tasks_Completed") }}</span>
              <span><CircleCheck class="text-green-500" /></span>
            </span>
            <span
              v-if="!isTasksLoading && tasks.length != completedTasks.length"
            >
              {{ completedTasks.length }}/{{ tasks.length }}
            </span>
          </div>
          <p class="text-xs text-muted-foreground">Tasks completed</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              class="bg-green-500 h-2 rounded-full"
              :style="{
                width: (completedTasks.length / tasks.length) * 100 + '%',
              }"
            ></div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
