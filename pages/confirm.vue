<script setup lang="ts">
import type { FormError } from "#ui/types";

const { auth } = useSupabaseClient();
const toast = useToast();
const token = ref();

const isLoadingBtn = ref(false);

const validate = (): FormError[] => {
  const errors = [];
  if (!token.value)
    errors.push({ path: "token", message: "Ce champ est requis" });
  return errors;
};

const sendVerifyToken = async () => {
  const { error } = await auth.verifyOtp({
    email: localStorage.getItem("email") as string,
    token: token.value,
    type: "signup",
  });

  if (error)
    toast.add({
      title: "Vérification",
      description: "Echec de la vérification",
    });
  else navigateTo("/");
};

const handleSumitVerifyOTP = async () => {
  isLoadingBtn.value = true;
  await sendVerifyToken();
  isLoadingBtn.value = false;
};

const handleResendToken = async () => {
  isLoadingBtn.value = true;
  await auth.resend({
    email: localStorage.getItem("email") as string,
    type: "signup",
  });
  isLoadingBtn.value = false;
};
</script>

<template>
  <UContainer
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-y-4"
  >
    <UCard>
      <UForm
        :state="token"
        :validate="validate"
        class="space-y-4"
        @submit="handleSumitVerifyOTP"
      >
        <h1 class="text-2xl font-bold text-center">Vérification</h1>

        <UFormGroup label="Code" name="token">
          <UInput v-model="token" />
        </UFormGroup>

        <UButton label="Vérifier" block type="submit" :loading="isLoadingBtn" />

        <p class="cursor-pointer text-center" @click="handleResendToken">
          Vous n'avez pas reçu le code ?
          <a class="underline">renvoyer le code</a>
        </p>
      </UForm>
    </UCard>
  </UContainer>
</template>
