<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { draw } from "@/lib/landingAnimation";
import debounce from "debounce";
import { onMounted, Ref, ref } from "vue";
import { RouterLink } from "vue-router";

const canvas = ref<HTMLCanvasElement | null>(null);

const resize = (window: Window, canvas: Ref<HTMLCanvasElement | null>) => {
  if (!canvas.value || !window) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

onMounted(() => {
  if (!canvas.value) return;
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;

  resize(window, canvas);

  const animation = window.requestAnimationFrame(() =>
    draw(window, ctx, canvas.value!)
  );

  window.addEventListener(
    "resize",
    debounce(() => resize(window, canvas), 500)
  );

  return () => {
    window.cancelAnimationFrame(animation);
    window.removeEventListener("resize", () => resize(window, canvas));
  };
});
</script>

<template>
  <div
    class="absolute flex flex-nowrap justify-start items-center flex-row-reverse w-full h-fit p-4"
  >
    <RouterLink to="/auth/login">
      <Button>Login</Button>
    </RouterLink>
  </div>
  <canvas
    ref="canvas"
    class="-z-50 h-screen w-screen block absolute top-0 left-0 blur-3xl border border-muted"
  ></canvas>

  <div class="flex justify-center items-center h-5/6">
    <div class="text-center">
      <h1 class="text-[10rem] font-bold text-primary">KLM</h1>
      <p class="text-4xl text-black">Unlock a New Way to Manage Your Life</p>
      <RouterLink to="/auth/register">
        <Button
          variant="outline"
          class="mt-4 bg-transparent border-black text-xl hover:bg-black hover:text-white"
          >Get Started</Button
        >
      </RouterLink>
    </div>
  </div>
</template>
