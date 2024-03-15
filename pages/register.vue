<script setup lang="ts">
definePageMeta({
  layout: "layout-without-navbar",
});

const { auth } = useSupabaseClient();
const toast = useToast();

const passwordIsVisible = ref(false);
const confirmPasswordIsVisible = ref(false);

const newUser = ref({
  email: "",
  password: "",
  confirmPassword: "",
  userName: "",
});

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validate = (state: any) => {
  const errors = [];
  // Required fields
  if (!state.email)
    errors.push({ path: "email", message: "Ce champ est requis" });
  if (!state.password)
    errors.push({ path: "password", message: "RCe champ est requisequis" });
  if (!state.confirmPassword)
    errors.push({ path: "confirmPassword", message: "Ce champ est requis" });
  if (!state.userName)
    errors.push({ path: "userName", message: "Ce champ est requis" });

  // Rules specific
  if (state.password !== state.confirmPassword)
    errors.push({
      path: "confirmPassword",
      message: "Les mots de passes ne correspondent pas",
    });
  if (!isValidEmail(state.email))
    errors.push({ path: "email", message: "Email invalide" });
  return errors;
};

const handleSignUp = async () => {
  const { error } = await auth.signUp({
    email: newUser.value.email,
    password: newUser.value.password,
    options: {
      data: {
        full_name: newUser.value.userName,
      },
    },
  });

  if (error)
    toast.add({
      title: "Inscription",
      description: "Erreur lors de l'inscription",
    });
  else {
    toast.add({
      title: "Inscription",
      description: "Un email de confirmation vous a été envoyé",
    });
    localStorage.setItem("email", newUser.value.email);

    navigateTo("/confirm");
  }
};
</script>
<template>
  <UContainer
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col gap-y-4"
  >
    <UCard>
      <UForm
        :state="newUser"
        :validate="validate"
        class="space-y-4"
        @submit="handleSignUp"
      >
        <h1 class="text-2xl font-bold text-center">Inscription</h1>

        <UFormGroup label="Prénom Nom" name="userName">
          <UInput v-model="newUser.userName" placeholder="Ex: Jean Dupond" />
        </UFormGroup>

        <UFormGroup label="Email" name="email">
          <UInput
            v-model="newUser.email"
            placeholder="Ex: jean.dupond@gmail.com"
          />
        </UFormGroup>

        <UFormGroup label="Mot de passe" name="password">
          <div class="flex gap-2 w-full">
            <UInput
              v-model="newUser.password"
              :type="passwordIsVisible ? 'text' : 'password'"
              class="flex-1"
            />
            <UButton
              color="white"
              icon="i-heroicons-eye"
              class="px-2"
              @click="passwordIsVisible = !passwordIsVisible"
            ></UButton>
          </div>
        </UFormGroup>
        <UFormGroup label="Confirmation mot de passe" name="confirmPassword">
          <div class="flex gap-2 w-full">
            <UInput
              v-model="newUser.confirmPassword"
              :type="confirmPasswordIsVisible ? 'text' : 'password'"
              class="flex-1"
            />
            <UButton
              color="white"
              icon="i-heroicons-eye"
              class="px-2"
              @click="confirmPasswordIsVisible = !confirmPasswordIsVisible"
            ></UButton>
          </div>
        </UFormGroup>

        <UButton type="submit" block>S'inscrire</UButton>

        <ULink to="/login" class="text-center block underline">
          Déjà inscrit ? Connectez-vous
        </ULink>
      </UForm>
    </UCard>
  </UContainer>
</template>
