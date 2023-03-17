import * as z from "zod";

import { loginSchema, invoiceDetailsSchema, newInvoiceSchema } from "./schemas";

export type Schema<TData> = {
  parse: (data: unknown) => TData;
};

export type LoginData = z.infer<typeof loginSchema>;

export type InvoiceItem = z.infer<typeof invoiceDetailsSchema>;

export type NewInvoiceItem = z.infer<typeof newInvoiceSchema>;

export type ActionParams = {
  sortBy?: string;
  sortOrder?: string;
  keyword?: string;
  pageSize?: string;
  pageNum?: string;
  fromDate?: string;
  toDate?: string;
};
