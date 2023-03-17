import { Outlet, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider, Container } from "@mantine/core";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import CustomError from "../utils/error";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, err) => {
        // Disable query retries if auth token expired.
        if (err instanceof CustomError) {
          return false;
        }

        if (failureCount > 3) {
          return false;
        }

        return true;
      },
    },
  },
});

export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Provider theme={defaultTheme} colorScheme="light">
          <Container>
            <header>
              <h1>
                <Link to="/">101 Test</Link>
              </h1>
            </header>

            <main>
              <Outlet />
            </main>
          </Container>
          <ToastContainer position="bottom-right" />
        </Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
