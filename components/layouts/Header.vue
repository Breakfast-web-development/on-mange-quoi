<script setup lang="ts">
const { auth } = useSupabaseClient();
const user = useSupabaseUser();

const items = computed(() => [
  [
    {
      label: user.value ? user.value?.user_metadata.full_name : "Connexion",
      icon: "i-heroicons-user",
      click: () => {
        if (!user.value) {
          navigateTo("/login");
        } else {
          navigateTo("/profile");
        }
      },
    },
  ],
  [
    {
      label: "Déconnexion",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      click: async () => {
        await auth.signOut();
        navigateTo("/login");
      },
    },
  ],
]);

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
    class="bg-white dark:bg-gray-900 black px-4 py-2 flex justify-between items-center border-b-1"
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
