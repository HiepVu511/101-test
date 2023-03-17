import { TextInput } from "@mantine/core";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import { newInvoiceMutation } from "../utils/api";
import { InvoiceItem } from "../utils/types";

type NewInvoiceFormData = Omit<InvoiceItem, "invoiceId">;

const NewInvoice = () => {
  const { register, handleSubmit } = useForm<NewInvoiceFormData>();

  const { mutate, isError } = useMutation({
    mutationFn: newInvoiceMutation,
    onSuccess: (res) => {
      // TODO: Invalidate invoices query
      console.log(res);
    },
  });

  return (
    <div>
      <h1>Create new invoice</h1>
      {isError && <p>Something went wrong! Please submit the form again</p>}
      <form
        onSubmit={handleSubmit((d) => {
          mutate(d);
        })}
      >
        <TextInput label="Invoice Number" {...register("invoiceNumber")} />
        <TextInput label="Description" {...register("description")} />
        <TextInput label="Due date" {...register("dueDate")} />
        <TextInput label="Total Amount" {...register("totalAmount")} />
        <TextInput label="Total Tax" {...register("totalTax")} />
        <TextInput label="Total Paid" {...register("totalPaid")} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewInvoice;
