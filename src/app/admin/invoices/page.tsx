"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Invoice } from "@/types/invoice";
import { getStoredInvoices } from "@/lib/orderService";
import { formatINR, formatDate } from "@/lib/utils";
import { Badge, Input, Button } from "@/components/ui";

export default function AdminInvoicesListPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setInvoices(getStoredInvoices());
  }, []);

  const filteredInvoices = invoices.filter((inv) => {
    return (
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerDetails.fullName.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerDetails.phone.includes(search) ||
      inv.orderNumber.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900">
            GST Invoices Ledger
          </h1>
          <p className="text-xs text-sand-500 mt-1">
            Permanent, immutable tax records generated for completed furniture sales.
          </p>
        </div>
        <Link href="/admin/orders">
          <Button variant="secondary" size="sm">
            &larr; Back to Orders
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-sm border border-sand-200 shadow-subtle space-y-4">
        <div className="max-w-md w-full">
          <Input
            placeholder="Search by Invoice #, Customer, Phone, or Order #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-sand-200">
            <thead className="bg-linen-100 text-sand-500 uppercase font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Taxable Val</th>
                <th className="py-3 px-4">GST (CGST/SGST/IGST)</th>
                <th className="py-3 px-4">Grand Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">View / Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 text-espresso-900">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-sand-500">
                    No invoices recorded yet.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-linen-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-brass-700">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3 px-4 font-mono text-sand-500">
                      {inv.orderNumber}
                    </td>
                    <td className="py-3 px-4 text-sand-500">
                      {formatDate(inv.issueDate)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold">{inv.customerDetails.fullName}</div>
                      <div className="text-[11px] text-sand-500">+91 {inv.customerDetails.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {formatINR(inv.taxableAmount)}
                    </td>
                    <td className="py-3 px-4 font-mono text-sand-600">
                      {formatINR(inv.totalCgst + inv.totalSgst + inv.totalIgst)}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-espresso-900">
                      {formatINR(inv.grandTotal)}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="success">{inv.paymentStatus}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link href={`/admin/invoices/${inv.id}`}>
                        <Button size="sm" variant="secondary" className="text-xs py-1 px-3">
                          Open Bill &rarr;
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
