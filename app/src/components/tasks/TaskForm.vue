<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { TaskSchema } from "@/schemas/TaskSchema";
import { useAPI } from "@/services/API";
import { useTranslation } from "@/services/Translation";
import { TaskType } from "@/types/TaskType";
import {
  CalendarDate,
  DateFormatter,
  parseDate,
} from "@internationalized/date";
import {
  Calendar as CalendarIcon,
  Clock,
  LoaderCircle,
  Text,
} from "lucide-vue-next";
import { toDate } from "radix-vue/date";
import { useForm } from "vee-validate";
import { computed, onMounted, ref } from "vue";
import { toast } from "vue-sonner";

const { t, locale } = useTranslation();

const props = defineProps<{
  taskToEdit?: TaskType;
  groupId: number;
}>();
const emits = defineEmits(["onTaskCreated", "onTaskUpdated"]);
const isDueDate = ref(false);
const isDueTime = ref(false);
const isDescription = ref(false);
const placeholder = ref();
const isDueDatePopover = ref(false);
const isLoading = ref(false);
const api = useAPI();

const formSchema = TaskSchema;

const { handleSubmit, setFieldValue, values, setValues } = useForm({
  validationSchema: formSchema,
});

const df = new DateFormatter(locale.value, {
  dateStyle: "long",
});

const dueDate = computed({
  get: () => (values.dueDate ? parseDate(values.dueDate) : undefined),
  set: (val) => val,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  const toSend = {
    ...values,
    dueDate: values.dueDate ? new Date(values.dueDate).toISOString() : null,
  };
  if (values.dueTime) {
    const today = new Date();
    const time = values.dueTime.split(":");
    today.setHours(parseInt(time[0]));
    today.setMinutes(parseInt(time[1]));
    toSend.dueTime = today.toISOString();
  }
  try {
    if (!props.taskToEdit) {
      const response = await api.post(
        `/taskGroups/${props.groupId}/tasks`,
        toSend
      );
      emits("onTaskCreated", response.data.task as TaskType);
    } else {
      const response = await api.put(
        `/taskGroups/${props.groupId}/tasks/${props.taskToEdit.id}`,
        toSend
      );
      emits("onTaskUpdated", response.data.task as TaskType);
    }
  } catch (error: any) {
    toast.error(t("Task_Form_Failed"));
    console.error(error);
    isLoading.value = false;
    return;
  }
  isLoading.value = false;
});

const onDueDate = () => {
  isDueDate.value = !isDueDate.value;
};

const onDueTime = () => {
  isDueTime.value = !isDueTime.value;
};

const onDescription = () => {
  isDescription.value = !isDescription.value;
};

const onDueDatePopoverSubmit = () => {
  isDueDatePopover.value = !isDueDatePopover.value;
};

const onDueDatePopoverCancel = () => {
  setFieldValue("dueDate", undefined);
  isDueDatePopover.value = !isDueDatePopover.value;
};

onMounted(() => {
  setFieldValue("groupId", props.groupId);
  if (props.taskToEdit) onApplyEdit();
});

const onApplyEdit = () => {
  setValues({
    title: props.taskToEdit?.title,
    description: props.taskToEdit?.description,
    dueDate: props.taskToEdit?.dueDate
      ? new Date(props.taskToEdit.dueDate).toISOString().split("T")[0]
      : undefined,
    dueTime: props.taskToEdit?.dueTime
      ? new Date(props.taskToEdit.dueTime).toTimeString().slice(0, 5)
      : undefined,
  });
  if (props.taskToEdit?.description) isDescription.value = true;
  if (props.taskToEdit?.dueDate) isDueDate.value = true;
  if (props.taskToEdit?.dueTime) isDueTime.value = true;
};
</script>

<template>
  <form @submit="onSubmit" class="p-4 w-full pb-1 space-y-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormControl>
          <Input
            type="text"
            :placeholder="t('Task_Form_Field_Title')"
            v-bind="componentField"
            autofocus
          />
        </FormControl>
        <FormMessage
          class="animate-in"
          :message="t('Task_Form_Field_Error_Title')"
        />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="description"
      v-if="isDescription"
    >
      <FormItem>
        <FormControl>
          <Textarea
            :placeholder="t('Task_Form_Field_Description')"
            v-bind="componentField"
            class="w-full resize-none max-h-36"
          />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField name="dueDate" v-if="isDueDate">
      <FormItem class="flex flex-col">
        <Popover v-model:open="isDueDatePopover">
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-full ps-3 text-start font-normal',
                    !dueDate && 'text-muted-foreground'
                  )
                "
              >
                <span>{{
                  dueDate
                    ? df.format(toDate(dueDate))
                    : t("Task_Form_Field_Due_Date")
                }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              v-model="dueDate"
              initial-focus
              :min-value="new CalendarDate(1900, 1, 1)"
              @update:model-value="
                (v) => {
                  if (v) {
                    setFieldValue('dueDate', v.toString());
                  } else {
                    setFieldValue('dueDate', undefined);
                  }
                }
              "
            />
            <div class="mt-1 flex flex-row flex-nowrap gap-2 p-1">
              <Button class="w-full" @click="onDueDatePopoverSubmit">
                {{ t("Submit") }}
              </Button>
              <Button
                class="w-full"
                variant="destructive"
                @click="onDueDatePopoverCancel"
              >
                {{ t("Cancel") }}
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="dueTime" v-if="isDueTime">
      <FormItem>
        <FormControl>
          <Input
            type="time"
            :placeholder="t('Task_Form_Field_DueTime')"
            v-bind="componentField"
          />
        </FormControl>
      </FormItem>
    </FormField>
    <div class="flex flex-row flex-nowrap gap-2">
      <Button
        :variant="isDescription ? 'default' : 'outline'"
        class="w-1/3"
        @click="onDescription"
        type="button"
      >
        <Text class="size-6" />
      </Button>
      <Button
        :variant="isDueDate ? 'default' : 'outline'"
        class="w-1/3"
        @click="onDueDate"
        type="button"
      >
        <CalendarIcon class="size-6" />
      </Button>
      <Button
        :variant="isDueTime ? 'default' : 'outline'"
        class="w-1/3"
        @click="onDueTime"
        type="button"
      >
        <Clock class="size-6" />
      </Button>
    </div>
    <Button type="submit" class="mt-4 w-full">
      <LoaderCircle v-if="isLoading" class="size-6 animate-spin" />
      <span v-else>{{ t("Submit") }}</span>
    </Button>
  </form>
</template>
