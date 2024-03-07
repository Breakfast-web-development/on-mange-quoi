<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
  [
    {
      label: "Déconnexion",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
    },
  ],
];

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

const prevScrollPosition = ref(0);
const visible = ref(true);
let scrollTimeout;

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > prevScrollPosition.value) {
    visible.value = false;
  } else {
    visible.value = true;
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    visible.value = true;
  }, 200); // Adjust the timeout value as needed
  prevScrollPosition.value = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="bg-black px-4 py-2 flex justify-between items-center border-b-1"
    :class="[
      'transition ease-linear duration-700 border-gray-900 bg-gray-50 flex border-b w-full fixed z-50',
      visible
        ? 'transition ease-linear duration-700'
        : 'hidden transition ease-linear duration-700',
    ]"
  >
    <div class="font-bold">On mange quoi</div>
    <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
      <UButton
        color="white"
        icon="i-heroicons-user"
        trailing-icon="i-heroicons-chevron-down-20-solid"
      />
    </UDropdown>
  </header>
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
