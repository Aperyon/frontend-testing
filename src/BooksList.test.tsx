import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { render, server } from "./setupTest";
import BooksList from "./BooksList";

import { http, HttpResponse } from "msw";

test("Renders Page title and books", async () => {
  server.use(
    http.get("/api/books/", () => {
      return HttpResponse.json([{ url: "/api/books/1/", title: "First Book" }]);
    }),
  );

  render(<BooksList />);
  const pageTitle = await screen.findByText("booksListPageTitle");
  const book1Title = screen.getByText("First Book");

  expect(pageTitle).toBeTruthy();
  expect(book1Title).toBeTruthy();
});

test("Empty books list", async () => {
  server.use(
    http.get("/api/books/", () => {
      return HttpResponse.json([]);
    }),
  );

  render(<BooksList />);
  const pageTitle = await screen.findByText("booksListPageTitle");
  const book1Title = screen.queryByText("First Book");

  expect(pageTitle).toBeTruthy();
  expect(book1Title).toBeNull();
});

test("Server Error", async () => {
  server.use(
    http.get("/api/books/", () => {
      return new HttpResponse(null, { status: 500 });
    }),
  );

  render(<BooksList />);
  const pageTitle = await screen.findByText("booksListPageTitle");
  const book1Title = screen.queryByText("First Book");

  expect(pageTitle).toBeTruthy();
  expect(book1Title).toBeNull();
});
