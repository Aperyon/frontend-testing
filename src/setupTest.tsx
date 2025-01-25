import { ReactNode } from "react";
import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, beforeAll, afterAll, afterEach } from "vitest";
import { render as tlrRender, cleanup } from "@testing-library/react";
import "./i18n";

vi.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (i18nKey: string) => i18nKey,
      // or with TypeScript:
      //t: (i18nKey: string) => i18nKey,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => { },
  },
}));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

export function render(children: ReactNode) {
  tlrRender(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
}

export const server = setupServer();

beforeAll(() => server.listen());
afterEach(async () => {
  cleanup();
  queryClient.clear();
  server.resetHandlers();
});
afterAll(() => server.close());
