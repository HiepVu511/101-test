import React from "react";
import Invoices from "./Invoices";

describe("<Invoices />", () => {
  it("renders correctly", () => {
    const items = [
      {
        invoiceId: "79b9457c-b5a7-4e5c-bb45-0be9d3797418",
        invoiceNumber: "INV1652377472736",
        referenceNo: "1652377482061",
        type: "TAX_INVOICE",
        currency: "GBP",
        invoiceDate: "2096-05-12",
        createdAt: "2022-05-12T17:44:45.152",
        dueDate: "2021-06-04",
        status: [
          {
            key: "Overdue",
            value: true,
          },
        ],
        subStatus: [],
        numberOfDocuments: 1,
        totalTax: 101,
        totalAmount: 991,
        balanceAmount: 991,
        description: "",
        totalPaid: 0,
        invoiceSubTotal: 910,
        customFields: [
          {
            key: "invoiceCustomField",
            value: "value",
          },
          {
            key: "createdBy",
            value: "d2258c8d-96b2-48e4-9e4f-0316e3f98059",
          },
        ],
        totalDiscount: 110,
        extensions: [],
        version: "1",
        customer: {
          id: "b605ad26-dd5d-4ea3-a7de-a0b7c5219528",
          firstName: "Nguyen",
          lastName: "Dung 2",
          name: "Dung 2",
          addresses: [],
        },
        merchant: {
          id: "6bf32cc4-2dfb-40c6-bd41-a6aea55fd4dc",
        },
        invoiceGrossTotal: 1000,
      },
      {
        invoiceId: "e4eeccb5-6da0-413a-a42f-6026bcbda6f2",
        invoiceNumber: "0x67fd97dbce5cf620a1c7afb65408ded327d5fbfa",
        referenceNo: "xzcsczx",
        type: "TAX_INVOICE",
        currency: "LBP",
        invoiceDate: "2023-12-25",
        createdAt: "2023-03-12T10:22:22.416",
        dueDate: "2023-03-12",
        status: [
          {
            key: "Overdue",
            value: true,
          },
        ],
        subStatus: [],
        totalTax: 28.4,
        totalAmount: 73.4,
        balanceAmount: 73.4,
        description: "hfg",
        totalPaid: 0,
        invoiceSubTotal: 71,
        customFields: [
          {
            key: "invoiceCustomField",
            value: "13",
          },
          {
            key: "createdBy",
            value: "d2258c8d-96b2-48e4-9e4f-0316e3f98059",
          },
        ],
        totalDiscount: 27,
        extensions: [],
        version: "1",
        merchant: {
          id: "6bf32cc4-2dfb-40c6-bd41-a6aea55fd4dc",
        },
        invoiceGrossTotal: 72,
      },
      {
        invoiceId: "10e1d258-915b-4f50-b355-6a575ca268ca",
        invoiceNumber: "0xe26509c4afda52dee4ec347dd6ebebce920c90eb",
        referenceNo: "xzcsczx",
        type: "TAX_INVOICE",
        currency: "LRD",
        invoiceDate: "2023-10-07",
        createdAt: "2023-03-12T11:28:42.924",
        dueDate: "2023-03-13",
        status: [
          {
            key: "Overdue",
            value: true,
          },
        ],
        subStatus: [],
        totalTax: 166.15,
        totalAmount: 957.35,
        balanceAmount: 957.35,
        description: "xcvxcv",
        totalPaid: 0,
        invoiceSubTotal: 791.2,
        customFields: [
          {
            key: "invoiceCustomField",
            value: "6",
          },
          {
            key: "createdBy",
            value: "d2258c8d-96b2-48e4-9e4f-0316e3f98059",
          },
        ],
        totalDiscount: 68.8,
        extensions: [],
        version: "1",
        merchant: {
          id: "6bf32cc4-2dfb-40c6-bd41-a6aea55fd4dc",
        },
        invoiceGrossTotal: 860,
      },
    ];

    cy.mount(<Invoices items={items} />);

    const cols = cy.get('[data-testid="invoiceCols"]');

    // Have correct number of columns
    cols
      .children("th")
      .should("have.length", 5)
      .and("contain", "Number")
      .and("contain", "Due date")
      .and("contain", "Total Amount")
      .and("contain", "Total Tax");

    const rows = cy.get('[data-testid="invoiceRows"]');

    // Have correct number of rows
    rows.children("tr").should("have.length", items.length);
  });
});
