import { describe, test } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("Page d'accueil", async () => {
  await setup({
    rootDir: "../app", // Chemin vers le répertoire racine de votre application Nuxt
    configFile: "nuxt.config", // Nom du fichier de configuration Nuxt
    setupTimeout: 60000, // Temps maximal pour que setupTest soit complété en millisecondes
    server: true, // Lancer un serveur pour répondre aux requêtes dans le jeu de tests
    port: 4000, // Port du serveur de test, laisser undefined pour utiliser un port aléatoire
    build: true, // Exécuter une étape de build séparée
    browser: false, // Ne pas lancer de navigateur pour le test
    runner: "vitest", // Utiliser Vitest comme runner de test
  });

  test("Test de la page d'accueil", async () => {
    // Effectuer des assertions sur la page d'accueil
    const html = await $fetch("/"); // Obtenir le HTML de la page d'accueil
    // Effectuer des assertions sur le HTML ou analyser la structure de la page
  });
});
