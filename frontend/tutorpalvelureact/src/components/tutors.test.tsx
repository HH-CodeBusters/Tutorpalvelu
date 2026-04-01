import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import { test, expect, vi } from "vitest";
import AppUser from "./tutors";

test("renders tutors from API", async () => {
  const mockData = [
    {
      id: 1,
      firstname: "Tuomo",
      lastname: "Tutor",
      school: "ei koulua",
      city: "Helsinki",
      email: "tuomo.tutor@gmail.com",
      phone: "+358415620247",
      subjects: [
        { subjectname: "Math" },
        { subjectname: "Physics" },
],
    },
  ];

  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    json: async () => mockData,
  } as any);

  render(<AppUser/>);

  expect(await screen.findByText("Tuomo Tutor")).toBeInTheDocument();
  expect(screen.getByText(/ei koulua/)).toBeInTheDocument();
  expect(screen.getByText(/Math/)).toBeInTheDocument();
});

test("renders multiple tutors", async () => {
  const mockData = [
    { id: 1, firstname: "A", lastname: "A", subjects: [] },
    { id: 2, firstname: "B", lastname: "B", subjects: [] },
  ];

  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    json: async () => mockData,
  } as any);

  render(<AppUser />);

  const tutors = await screen.findAllByText(/A|B/);
  expect(tutors.length).toBeGreaterThan(1);
});

test("handles fetch error", async () => {
  vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("API error"));

  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  render(<AppUser />);

  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalled();
  });
});

test("renders subjects correctly", async () => {
  const mockData = [
    {
      id: 1,
      firstname: "Test",
      lastname: "User",
      subjects: [
        { subjectname: "Math" },
        { subjectname: "Physics" },
      ],
    },
  ];

  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    json: async () => mockData,
  } as any);

  render(<AppUser />);

  expect(await screen.findByText("Math, Physics")).toBeInTheDocument();
});

test("renders nothing when no tutors", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    json: async () => [],
  } as any);

  render(<AppUser />);

  await waitFor(() => {
    expect(screen.queryByText(/@/)).not.toBeInTheDocument();
  });
});

