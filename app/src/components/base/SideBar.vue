<script setup lang="ts">
import Avatar from "@/components/me/Avatar.vue";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/services/Auth";
import { LayoutDashboard, ListTodo, LogOut, Menu } from "lucide-vue-next";
import { ref, watch } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { toast } from "vue-sonner";

const auth = useAuth();
const router = useRouter();
const isOpen = ref(false);
const onLougout = () => {
  auth.logout();
  toast.success("Logged out successfully");
  router.push({
    name: "Login",
  });
};

watch(
  router.currentRoute,
  () => {
    isOpen.value = false;
  },
  { immediate: true }
);
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        <Menu class="size-7" />
      </Button>
    </SheetTrigger>
    <SheetContent
      class="px-4 py-4 box-border flex flex-col justify-between items-start"
    >
      <div class="w-full">
        <SheetHeader>
          <SheetTitle>
            <div class="flex flex-row items-center justify-start gap-2">
              <Button variant="ghost" size="icon" class="rounded-full">
                <Avatar class="size-9" />
              </Button>
              <span class="text-lg font-bold">Menu</span>
            </div>
          </SheetTitle>
          <SheetDescription> What's your next move? </SheetDescription>
        </SheetHeader>
        <div class="w-full flex flex-col items-center justify-start gap-2 mt-2">
          <RouterLink
            :to="{ name: 'Dashboard' }"
            exactActiveClass="group active"
            class="w-full"
          >
            <Button
              class="flex flex-row items-center justify-start w-full px-2 py-1 h-9 bg-secondary-foreground group-[.active]:bg-primary"
            >
              <LayoutDashboard class="size-5" />
              <span class="w-5/6 text-center"> Home </span>
            </Button>
          </RouterLink>
          <RouterLink
            :to="{ name: 'Tasks' }"
            exactActiveClass="group active"
            class="w-full"
          >
            <Button
              class="flex flex-row items-center justify-start w-full px-2 py-1 h-9 bg-secondary-foreground group-[.active]:bg-primary"
            >
              <ListTodo class="size-5" />
              <span class="w-5/6 text-center"> Tasks </span>
            </Button>
          </RouterLink>
        </div>
      </div>
      <SheetFooter class="w-full">
        <Button
          @click="onLougout"
          class="flex flex-row items-center justify-start w-full px-2 py-1 h-9"
          variant="destructive"
        >
          <LogOut />
          <span class="w-5/6 text-center"> Logout </span>
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
