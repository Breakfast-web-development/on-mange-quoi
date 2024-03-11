<script setup lang="ts">
const user = useSupabaseUser();
</script>
<template>
  <div>Profil : {{ user?.user_metadata.full_name }}</div>
</template>
