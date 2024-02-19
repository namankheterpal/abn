import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";

import { mount } from "@vue/test-utils";
import ShowList from "@/components/ShowList.vue";

describe("ShowList", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders properly", () => {
    const wrapper = mount(ShowList, {
      props: { name: "Test Genre", showIds: [] },
    });

    expect(wrapper.find('[data-testid="genre-name"]').text()).toContain(
      "Test Genre"
    );

    expect(wrapper.find('[data-testid="genre-count"]').text()).toContain(
      "0 shows"
    );
  });
});
