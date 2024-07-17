<script setup lang="ts">
import { useForm } from "vee-validate";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { useAuth } from "@/services/Auth";
import { LoaderCircle } from "lucide-vue-next";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const auth = useAuth();
const router = useRouter();
const isLoading = ref(false);

const formSchema = RegisterSchema;

const form = useForm({
  validationSchema: formSchema,
});

onBeforeMount(async () => {
  const isAuthenticated = await auth.isAuthenticated();
  if (isAuthenticated) router.push({ name: "Dashboard" });
});

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await auth.register(values);
  } catch (error: any) {
    toast.error(error.message);
    isLoading.value = false;
    return;
  }
  toast.success("Registered successfully!");
  router.push({
    name: "Dashboard",
  });
  isLoading.value = false;
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Register</CardTitle>
      <CardDescription>
        Together, we will turn empty spaces into vibrant places filled with
        warmth and connection.
      </CardDescription>
    </CardHeader>
    <form @submit="onSubmit">
      <CardContent class="space-y-2">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>
      <CardFooter class="flex flex-row justify-center items-center">
        <Button type="submit" class="w-1/2">
          <span v-if="isLoading"><LoaderCircle class="animate-spin" /></span>
          <span v-else>Submit</span>
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
