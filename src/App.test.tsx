import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("loads and displays greeting", async () => {
  render(<App />);

  const counterButton = screen.getByText(/count is/);
  await userEvent.click(counterButton);

  expect(counterButton).toHaveTextContent("1");
});
