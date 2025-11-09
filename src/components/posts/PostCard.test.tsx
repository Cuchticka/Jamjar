import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom"
import PostCard from "./PostCard";

import type {UserType} from "@/types/UserType.ts"; 
import type {PostType} from "@/types/PostType.ts";

const mockPost: PostType = {
  id: 1,
  slug: "test-post",
  title: "Test Post",
  author: {
    slug: "author-slug",
    name: "Author Name",
    profilePicture: "",
    mod: false,
    admin: false,
    id: 1,
  } as unknown as UserType,
  createdAt: new Date(),
  tags: [],
  likes: [],
  hasLiked: false,
  comments: [],
  sticky: false,
  content: "<p>Hello world</p>",
};

const mockUser = {
  slug: "author-slug",
  name: "Author Name",
  profilePicture: "",
  mod: false,
  admin: false,
  id: 1,
} as unknown as UserType;

jest.mock('next-intl', () => ({
  useTranslations: () => ((key: string) => key),
  useFormatter: () => ((val: any) => val),
}));

import { SiteThemeProvider } from "@/providers/SiteThemeProvider"; // Adjust path if needed

// Suppress React act(...) warnings in test output
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: An update to SiteThemeProvider inside a test was not wrapped in act")
    ) {
      return undefined;
    }
    return originalError.apply(console, args);
  };
});
afterAll(() => {
  console.error = originalError;
});

describe("PostCard", () => {
  function renderWithProviders(ui: React.ReactElement) {
    return render(
      <SiteThemeProvider>
        {ui}
      </SiteThemeProvider>
    );
  }

  it("renders Cozy style", () => {
    renderWithProviders(<PostCard post={mockPost} style="Cozy" user={mockUser} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
    expect(screen.getByText("Author Name")).toBeInTheDocument();
  });

  it("renders Compact style", () => {
    renderWithProviders(<PostCard post={mockPost} style="Compact" user={mockUser} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("renders Ultra style", () => {
    renderWithProviders(<PostCard post={mockPost} style="Ultra" user={mockUser} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("minimizes and restores Cozy style", async () => {
    await act(async () => {
      renderWithProviders(<PostCard post={mockPost} style="Cozy" user={mockUser} />);
    });
    const minimizeBtn = screen.getByRole("button", { name: /minus/i });
    fireEvent.click(minimizeBtn);
    const restoreBtn = screen.getByRole("button", { name: /plus/i });
    fireEvent.click(restoreBtn);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("hides card when deleted by author", async () => {
    // You may want to mock deletePost and addToast for this test
    // This is a placeholder for interaction
    renderWithProviders(<PostCard post={mockPost} style="Cozy" user={mockUser} />);
    // Simulate dropdown and delete interaction here if needed
  });
});