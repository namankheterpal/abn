import { useRouter } from "vue-router";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import ShowSearchResult from "@/components/ShowSearchResult.vue";
import { useShowsStore } from "@/stores/shows";
import { defaultShowMock } from "./data";

vi.mock("vue-router");

describe("SearchResult", () => {
  const mockSearchResults = [
    {
      show: {
        ...defaultShowMock,
        id: 1,
        name: "Test Show 1",
        image: { medium: "test1.jpg" },
        rating: { average: 8.5 },
        language: "English",
      },
    },
    {
      show: {
        ...defaultShowMock,
        id: 2,
        name: "Test Show 2",
        image: { medium: "test2.jpg" },
        rating: { average: 3 },
        language: "Spanish",
      },
    },
  ];

  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useShowsStore();
    store.searchResults = mockSearchResults;
    store.searchShows = vi.fn();

    const router = useRouter();

    // @ts-ignore
    useRouter.mockReturnValue({
      ...router,
      push: vi.fn(),
    });
  });

  it("renders search results correctly", () => {
    const wrapper = mount(ShowSearchResult);
    const resultItems = wrapper.findAll(".result");

    expect(wrapper.find("h3").text()).toBe(
      `Results (${mockSearchResults.length} shows found)`,
    );

    expect(resultItems.length).toBe(mockSearchResults.length);

    mockSearchResults.forEach((result, index) => {
      const resultItem = resultItems[index];
      expect(resultItem.find("h2").text()).toBe(result.show.name);
      expect(resultItem.find("img").attributes("src")).toBe(
        result.show.image.medium,
      );
      expect(resultItem.find('[data-testid="rating"]').text()).toBe(
        `Rating: ${result.show.rating.average || "unknown"}`,
      );
      expect(resultItem.find('[data-testid="language"]').text()).toBe(
        `Language: ${result.show.language}`,
      );
    });
  });

  it("calls showDetails method when result is clicked", async () => {
    const wrapper = mount(ShowSearchResult);

    await wrapper.find(".result").trigger("click");

    expect(useShowsStore().searchShows).toHaveBeenCalledWith("");
    expect(useRouter().push).toHaveBeenCalledWith({
      name: "showDetails",
      params: {
        id: mockSearchResults[0].show.id,
      },
    });
  });
});
