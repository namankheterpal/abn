import { describe, it, vi, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import router from "@/router";
import { mount, shallowMount } from "@vue/test-utils";
import ShowDetails from "@/components/ShowDetails.vue";
import { useShowsStore } from "@/stores/shows";
import { defaultShowMock } from "./data";

const mockShows = {
  1: {
    ...defaultShowMock,
    id: 1,
    name: "Test Show",
    image: { medium: "test.jpg" },
    rating: { average: 8.5 },
    type: "TV Show",
    language: "English",
    genres: ["Drama", "Thriller"],
    summary: "<p>This is a test show summary.</p>",
  },
};

describe("ShowDetails", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useShowsStore();
    store.shows = mockShows;
  });

  it("renders show details correctly if show exists", async () => {
    const props = { id: "1" };
    const wrapper = mount(ShowDetails, {
      props,
      global: {
        plugins: [router],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find("h2").text()).toBe("Test Show");
    expect(wrapper.find('[data-testid="rating"]').text()).toBe("Rating: 8.5");
    expect(wrapper.find('[data-testid="type"]').text()).toBe("Type: TV Show");
    expect(wrapper.find('[data-testid="language"]').text()).toBe(
      "Language: English",
    );
    expect(
      wrapper.findAll('[data-testid="genre"]').map((label) => label.text()),
    ).toEqual(["#Drama", "#Thriller"]);
    expect(wrapper.find('[data-testid="summary"]').html()).toContain(
      "<p>This is a test show summary.</p>",
    );
  });

  it('renders "Back to all Shows" link', () => {
    const props = { id: "1" };
    const wrapper = mount(ShowDetails, {
      props,
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find("a").text()).toBe("←Back to all Shows");
    expect(wrapper.find("a").attributes("href")).toBe("/");
  });

  it("does not render show details if show does not exist", async () => {
    const props = { id: "non-existent-id" };
    const wrapper = shallowMount(ShowDetails, {
      props,
      global: {
        plugins: [router],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".header").exists()).toBe(false);
    expect(wrapper.find("div").exists()).toBe(false);
  });
});
