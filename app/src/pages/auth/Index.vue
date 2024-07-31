<script setup lang="ts">
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/services/Translation";
import { StringOrNumber } from "node_modules/radix-vue/dist/shared/types";
import { useRoute, useRouter } from "vue-router";

const { t } = useTranslation();
const route = useRoute();
const router = useRouter();

const handleTabChange = (value: StringOrNumber) => {
  router.push({ name: value as string });
};
</script>

<template>
  <section class="flex flex-col items-center justify-center h-screen w-full">
    <Tabs
      :default-value="route.name?.toString()"
      class="w-1/3 min-w-[350px] max-w-[450px]"
      @update:model-value="handleTabChange"
    >
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="Login"> {{ t("Login") }} </TabsTrigger>
        <TabsTrigger value="Register"> {{ t("Register") }} </TabsTrigger>
      </TabsList>
      <TabsContent value="Login">
        <Login />
      </TabsContent>
      <TabsContent value="Register">
        <Register />
      </TabsContent>
    </Tabs>
  </section>
</template>
