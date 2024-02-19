import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import ShowSearch from "@/components/ShowSearch.vue";
import router from "@/router";
import { useShowsStore } from "@/stores/shows";
import { defaultShowMock } from "./data";

describe("ShowSearch", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('displays "Searching..." when search is in progress', async () => {
    const store = useShowsStore();
    store.searchLoading = true;

    const wrapper = mount(ShowSearch);

    expect(wrapper.find('[data-testid="searching"]').text()).toBe(
      "Searching...",
    );
  });
  it('displays "No results found" when search query is not empty and no results are returned', async () => {
    const store = useShowsStore();
    store.searchResults = [];
    store.searchQuery = "non-existent-show";

    const wrapper = mount(ShowSearch);
    expect(wrapper.find(".title").text()).toBe("No results found");
  });
  it("renders ShowSearchResult component when search results are available", async () => {
    const store = useShowsStore();
    store.searchResults = [
      { show: { ...defaultShowMock, id: 1, name: "Show 1" } },
      { show: { ...defaultShowMock, id: 2, name: "Show 2" } },
    ];
    store.searchQuery = "show";

    const wrapper = mount(ShowSearch, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.findAll("h2").map((ele) => ele.text())).toEqual([
      "Show 1",
      "Show 2",
    ]);
  });
});
