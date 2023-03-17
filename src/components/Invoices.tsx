import { Link } from "react-router-dom";
import {Table} from '@mantine/core'

import type { InvoiceItem } from "../utils/types";

export const Item = (props: InvoiceItem) => {
  return (
    <tr>
      <th
        scope="row"
      >
        {props.invoiceNumber}
      </th>
      <td>{props.dueDate}</td>
      <td>{props.totalAmount}</td>
      <td>{props.totalPaid}</td>
      <td>
        <Link
          to={`invoices/${props.invoiceId}`}
          state={{ item: props }}
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export type InvoiceProps = {
  items: InvoiceItem[];
};

const Invoices = (props: InvoiceProps) => {
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <thead>
          <tr data-testid="invoiceCols">
            <th scope="col">
              Number
            </th>
            <th scope="col">
              Due date
            </th>
            <th scope="col">
              Total Amount
            </th>
            <th scope="col">
              Total Tax
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody data-testid="invoiceRows">
          {props.items.map((item) => (
            <Item {...item} key={item.invoiceId} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Invoices;
