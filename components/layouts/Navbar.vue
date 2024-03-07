<script setup lang="ts">
interface IRoutes {
  label: string;
  icon: string;
  to: string;
}

defineProps<{
  routes: IRoutes[];
}>();

const route = useRoute();
const isActive = (path: string) => path === route.path;
</script>
<template>
  <nav class="fixed bottom-0 p-4">
    <ul
      class="flex justify-evenly w-full bg-stone-100 dark:bg-stone-700 rounded-2xl px-4 py-3"
    >
      <li
        v-for="(path, index) in routes"
        :key="index"
        :class="{ 'text-primary dark:text-primary': isActive(path.to) }"
        class="flex flex-col items-center gap-1"
      >
        <UIcon :name="path.icon" />
        <ULink :to="path.to" class="text-sm font-semibold">{{
          path.label
        }}</ULink>
      </li>
    </ul>
  </nav>
</template>
