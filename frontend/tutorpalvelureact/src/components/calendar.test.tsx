import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import Calendar from "./calendar";

test("render calendar", async () => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  ) as any;

  render(<Calendar/>);

  expect(await screen.findByTestId("calendar")).toBeInTheDocument();
});

vi.mock("@fullcalendar/react", () => ({
  default: (props: any) => {
    return (
      <div data-testid="calendar">
        <button
          onClick={() =>
            props.select({
              startStr: "2026-01-01T10:00:00",
              endStr: "2026-01-01T11:00:00",
            })
          }
        >
          select time
        </button>
      </div>
    );
  },
}));

test("fetches events on mount", async () => {
  const mockData = [
    { id: "1", title: "Test", start: "2026-01-01T10:00:00" },
  ];

  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  ) as any;

  render(<Calendar />);

  expect(globalThis.fetch).toHaveBeenCalledWith("/api/appointments");
});

import userEvent from "@testing-library/user-event";

test("adds a new event when a time slot is selected", async () => {
  const fetchMock = vi.fn()
    // GET
    .mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    })
    // POST
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          id: "2",
          start: "2026-01-01T10:00:00",
          end: "2026-01-01T11:00:00",
        }),
    });

  globalThis.fetch = fetchMock as any;

  render(<Calendar />);

  const button = await screen.findByText("select time");

  await userEvent.click(button);

  expect(fetchMock).toHaveBeenCalledWith(
    "/api/appointments",
    expect.objectContaining({
      method: "POST",
    })
  );
});

test("adds a new event to the existing events", async () => {
  const fetchMock = vi.fn()
    // GET
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          { id: "1", start: "2026-01-01T09:00:00" },
        ]),
    })
    // POST
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          id: "2",
          start: "2026-01-01T10:00:00",
        }),
    });

  globalThis.fetch = fetchMock as any;

  render(<Calendar />);

  const button = await screen.findByText("select time");

  await userEvent.click(button);

  expect(fetchMock).toHaveBeenCalledTimes(2);
});

test("“handles API error", async () => {
  globalThis.fetch = vi.fn(() => Promise.reject("error")) as any;

  render(<Calendar />);

  // tärkeintä: ei kaadu
  expect(await screen.findByTestId("calendar")).toBeInTheDocument();
});