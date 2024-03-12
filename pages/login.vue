<script setup lang="ts">
import type { FormError } from "#ui/types";

definePageMeta({
  layout: "layout-without-navbar",
});

const config = useRuntimeConfig();

const supabase = useSupabaseClient();

const toast = useToast();

const credentials = ref({
  email: "",
  password: "",
});

const signInWithPassword = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: credentials.value.email,
    password: credentials.value.password,
  });
  if (error)
    toast.add({
      title: "Connexion",
      description: "Veuillez vérifier vos identifiants",
    });
  return true;
};

const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.hostname + "/",
    },
  });
  if (error) console.log(error);
};

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    phone: "",
  });
  if (error) console.log(error);
};

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Requis" });
  if (!state.password) errors.push({ path: "password", message: "Requis" });
  return errors;
};

const handleSubmitCredentials = async () => {
  const isValidAuth = await signInWithPassword();

  if (isValidAuth) {
    navigateTo("/");
  }
};
</script>
<template>
  <UContainer
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-y-4"
  >
    <UCard>
      <UForm
        :state="credentials"
        :validate="validate"
        class="space-y-4"
        @submit="handleSubmitCredentials"
      >
        <h1 class="text-2xl font-bold text-center">Connexion</h1>

        <UFormGroup label="Email" name="email">
          <UInput v-model="credentials.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="credentials.password" type="password" />
        </UFormGroup>

        <UButton label="Connexion" color="gray" block type="submit" />

        <UDivider label="OR" />

        <UButton
          label="Se connecter avec Google"
          icon=""
          block
          @click="signInWithGoogle"
        />
        <UButton
          label="Se connecter avec SMS"
          icon="i-heroicons-device-phone-mobile"
          block
          disabled
          @click="signInWithOtp"
        />
        <UButton
          label="Se connecter avec Discord"
          icon="i-simple-icons-google"
          block
          disabled
        />

        <ULink to="/register" class="text-center block underline">
          Pas de compte ? S'inscrire
        </ULink>
      </UForm>
    </UCard>
  </UContainer>
</template>
