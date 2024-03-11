<script setup lang="ts">
const links = [
  {
    label: "Accueil",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Recettes",
    icon: "i-heroicons-book-open",
    to: "/recipes",
  },
  {
    label: "Courses",
    icon: "i-heroicons-shopping-cart",
    to: "/shopping",
  },
  {
    label: "Planning",
    icon: "i-heroicons-calendar-days",
    to: "/planning",
  },
];
</script>

<template>
  <LayoutsHeader />
  <main class="pt-14 pb-24 px-4">
    <slot />
  </main>
  <LayoutsNavbar class="w-full" :routes="links"></LayoutsNavbar>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
