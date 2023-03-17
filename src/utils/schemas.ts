import * as z from "zod";

// TODO: More validate
export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(10, {
    message: "Your password must have at least 10 characters.",
  }),
});

export const newInvoiceSchema = z.object({
  invoiceNumber: z.string(),
  currency: z.string(),
  invoiceDate: z.string(),
  createdAt: z.string(),
  dueDate: z.string(),
  status: z.array(z.object({ key: z.string(), value: z.any() })),
  totalTax: z.number(),
  totalAmount: z.number(),
  description: z.string(),
  totalPaid: z.number(),
  customFields: z.array(z.object({ key: z.string(), value: z.any() })),
});

export const invoiceDetailsSchema = z
  .object({
    invoiceId: z.string(),
  })
  .merge(newInvoiceSchema);
