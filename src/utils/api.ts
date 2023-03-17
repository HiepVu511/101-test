import * as z from "zod";

import CustomError from "./error";
import type {
  LoginData,
  Schema,
  ActionParams,
  NewInvoiceItem,
} from "./types";
import { invoiceDetailsSchema } from "./schemas";

// Type-safe and runtime-safe fetch
const request = async <TSchema>(
  schema: Schema<TSchema>,
  ...args: Parameters<typeof fetch>
) => {
  const response = await fetch(...args);

  if (response.status === 401) {
    // TODO: Handle this with custom error
    throw new CustomError({
      name: "TOKEN_EXPIRE",
      message: "Session expired.",
    });
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  return schema.parse(data);
};

export const loginMutation = async ({ username, password }: LoginData) => {
  // These config below should be placed in a env file for security reason.
  // I put them here for demo purpose only.
  const clientId = "oO8BMTesSg9Vl3_jAyKpbOd2fIEa";
  const clientSecret = "0Exp4dwqmpON_ezyhfm0o_Xkowka";
  const grantType = "password";
  const scope = "openid";

  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const body = new URLSearchParams();
  body.append("client_id", clientId);
  body.append("client_secret", clientSecret);
  body.append("grant_type", grantType);
  body.append("scope", scope);
  body.append("username", username);
  body.append("password", password);

  const appAccessRes = await fetch("https://sandbox.101digital.io/token", {
    method: "POST",
    headers,
    body,
  });

  if (appAccessRes.status === 400) {
    throw new CustomError({
      name: "INCORRECT_CREDENTIALS",
      message: "Incorrect username or password.",
    });
  }

  if (!appAccessRes.ok) {
    throw new Error("App access network response was not ok.");
  }

  const appAccessData = await appAccessRes.json();

  const tokenSchema = z.string();

  const token = tokenSchema.parse(appAccessData.access_token);

  localStorage.setItem("accessToken", token);

  const profileRequestHeaders = new Headers();
  profileRequestHeaders.append("Content-Type", "application/json");
  profileRequestHeaders.append("Authorization", `Bearer ${token}`);

  const profileRes = await fetch(
    "https://sandbox.101digital.io/membership-service/1.2.0/users/me",
    {
      headers: profileRequestHeaders,
    }
  );

  if (!profileRes.ok) {
    throw new Error("Profile network response was not ok.");
  }

  return profileRes.json();
};

export const invoiceQuery = async (params: ActionParams) => {
  const accessToken = localStorage.getItem("accessToken");
  const orgToken = localStorage.getItem("orgToken");

  if (!orgToken || !accessToken) {
    throw new CustomError({
      name: "TOKEN_EXPIRE",
      message: "Session expired.",
    });
  }

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  headers.append("org-token", orgToken);

  const schema = z.object({
    data: z.array(invoiceDetailsSchema),
    paging: z.object({
      pageNumber: z.number(),
      pageSize: z.number(),
      totalRecords: z.number(),
    }),
  });

  const url = new URL(
    "https://sandbox.101digital.io/invoice-service/1.0.0/invoices"
  );
  const keyArr = Object.keys(params);

  keyArr.forEach((key) => {
    if (
      // TODO: Fix this
      key === "keyword" ||
      key === "sortBy" ||
      key === "sortOrder" ||
      key === "pageNum" ||
      key === "pageSize" ||
      key === "fromDate" ||
      key === "toDate"
    ) {
      const value = params[key];

      if (value) url.searchParams.set(key, value.toString());
    }
  });

  return request(schema, url, {
    headers,
  });
};

export const newInvoiceMutation = async (data: NewInvoiceItem) => {
  const accessToken = localStorage.getItem("accessToken");
  const orgToken = localStorage.getItem("orgToken");

  if (!orgToken || !accessToken) {
    throw new CustomError({
      name: "TOKEN_EXPIRE",
      message: "Session expired.",
    });
  }

  const url = "https://sandbox.101digital.io/invoice-service/1.0.0/invoices";

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${accessToken}`);
  headers.append("org-token", orgToken);
  headers.append("Operation-Mode", "SYNC");
  headers.append("Content-Type", "application/json");

  return fetch(url, { method: "POST", headers, body: JSON.stringify(data) });
};
