import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Navbar from "~/components/layouts/Navbar.vue";

describe("Navbar components", () => {
  it("test navbar", async () => {
    const wrapper = await mountSuspended(Navbar, {
      props: { routes: [{ icon: "", label: "Accueil", to: "/" }] },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
