import { describe, it, vi, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useRouter } from "vue-router";

import { mount } from "@vue/test-utils";
import { useShowsStore } from "@/stores/shows";
import ShowCard from "@/components/ShowCard.vue";
import { defaultShowMock } from "./data";

vi.mock("vue-router");

describe("ShowCard", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useShowsStore();
    store.shows = {
      1: {
        ...defaultShowMock,
        name: "test show",
        rating: {
          average: 9,
        },
      },
    };
  });
  it("renders show name and rating if show exists", async () => {
    const props = { id: 1 };

    const wrapper = mount(ShowCard, {
      props,
    });

    expect(wrapper.find('[data-testid="show-name"]').text()).toBe("test show");
    expect(wrapper.find('[data-testid="rating"]').text()).toBe("Rating: 9");
  });

  it("redirects to show details when card is clicked", async () => {
    const props = { id: 1 };

    const router = useRouter();

    // @ts-ignore
    useRouter.mockReturnValue({
      ...router,
      push: vi.fn(),
    });

    const wrapper = mount(ShowCard, {
      props,
    });

    await wrapper.find(".card").trigger("click");

    expect(useRouter().push).toHaveBeenCalledWith({
      name: "showDetails",
      params: {
        id: 1,
      },
    });
  });
});
