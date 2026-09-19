"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Invoice } from "@/types/invoice";
import { getInvoiceById } from "@/lib/orderService";
import { formatINR, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui";

export default function AdminInvoiceViewPage() {
  const params = useParams();
  const id = params.id as string;
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const found = getInvoiceById(id);
    if (found) setInvoice(found);
  }, [id]);

  if (!invoice) {
    return (
      <div className="bg-white p-12 text-center rounded-sm border border-sand-200">
        <h2 className="font-serif text-xl font-medium text-espresso-900">Invoice not found</h2>
        <Link href="/admin/invoices" className="text-xs text-brass-600 underline mt-2 block">
          Back to Invoices Ledger
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-sm border border-sand-200 shadow-subtle">
        <div className="flex items-center space-x-3 text-xs">
          <Link href="/admin/invoices" className="text-sand-500 hover:text-espresso-900">
            &larr; Invoices Ledger
          </Link>
          <span className="text-sand-300">|</span>
          <span className="font-semibold text-espresso-900">
            Invoice: {invoice.invoiceNumber}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="secondary" size="sm" onClick={handlePrint} className="gap-2">
            <span>🖨️</span> Print / Save as PDF
          </Button>
          <a
            href={`https://wa.me/91${invoice.customerDetails.phone}?text=Hello%20${encodeURIComponent(
              invoice.customerDetails.fullName
            )}%2C%20here%20is%20your%20official%20tax%20invoice%20${invoice.invoiceNumber}%20for%20your%20furniture%20order%20at%20Maa Samay Sitla Furniture and Electronics.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm" className="gap-2">
              <span>💬</span> Send Notice to Customer on WhatsApp
            </Button>
          </a>
        </div>
      </div>

      {/* The Printable A4 Tax Invoice Document */}
      <div className="bg-white p-8 sm:p-14 border border-sand-300 shadow-card max-w-4xl mx-auto text-espresso-900 print:border-none print:shadow-none print:p-0">
        {/* Header Letterhead */}
        <div className="flex justify-between items-start border-b-2 border-espresso-800 pb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-wider text-espresso-900">
              {invoice.storeDetails.name}
            </h1>
            <p className="text-xs text-sand-500 tracking-widest uppercase mt-0.5 font-medium">
              Bespoke Solid Wood Atelier
            </p>
            <p className="text-xs text-espresso-700 mt-2 max-w-sm leading-relaxed">
              {invoice.storeDetails.address}
            </p>
            <p className="text-xs text-espresso-700">
              Phone: {invoice.storeDetails.phone} &bull; Email: {invoice.storeDetails.email}
            </p>
            <p className="text-xs font-semibold text-espresso-900 mt-1">
              GSTIN: {invoice.storeDetails.gstin} &bull; State: {invoice.storeDetails.state} ({invoice.storeDetails.stateCode})
            </p>
          </div>

          <div className="text-right">
            <span className="font-serif text-2xl font-bold uppercase tracking-wider text-brass-700 block">
              TAX INVOICE
            </span>
            <div className="mt-2 text-xs space-y-1">
              <p><span className="text-sand-500">Invoice No:</span> <strong className="font-mono text-sm">{invoice.invoiceNumber}</strong></p>
              <p><span className="text-sand-500">Order Ref:</span> <strong className="font-mono">{invoice.orderNumber}</strong></p>
              <p><span className="text-sand-500">Invoice Date:</span> <strong>{formatDate(invoice.issueDate)}</strong></p>
            </div>
          </div>
        </div>

        {/* Bill To & Ship To */}
        <div className="grid grid-cols-2 gap-8 py-6 border-b border-sand-200 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-sand-400 block mb-1">
              BILLED TO:
            </span>
            <h3 className="font-serif text-base font-bold text-espresso-900">
              {invoice.customerDetails.fullName}
            </h3>
            <p className="text-espresso-700 mt-1 leading-relaxed">
              {invoice.customerDetails.billingAddress}
            </p>
            <p className="text-espresso-700 mt-1">
              Phone: +91 {invoice.customerDetails.phone}
            </p>
            {invoice.customerDetails.email && (
              <p className="text-espresso-700">Email: {invoice.customerDetails.email}</p>
            )}
            <p className="text-espresso-700 font-semibold mt-1">
              Place of Supply: {invoice.customerDetails.state}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-sand-400 block mb-1">
              PAYMENT & DISPATCH:
            </span>
            <div className="space-y-1 mt-1">
              <p><span className="text-sand-500">Payment Status:</span> <span className="font-bold text-forest-700">{invoice.paymentStatus}</span></p>
              <p><span className="text-sand-500">Payment Mode:</span> <span className="font-semibold">{invoice.paymentMethod}</span></p>
              <p><span className="text-sand-500">Delivery Method:</span> <span className="font-semibold">White-Glove In-Home Assembly</span></p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="py-6">
          <table className="w-full text-left text-xs divide-y divide-sand-300">
            <thead className="bg-linen-100 text-[10px] font-bold uppercase tracking-wider text-espresso-800">
              <tr>
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Item Description</th>
                <th className="py-2.5 px-3">HSN</th>
                <th className="py-2.5 px-3 text-center">Qty</th>
                <th className="py-2.5 px-3 text-right">Taxable Value</th>
                <th className="py-2.5 px-3 text-right">GST Rate</th>
                <th className="py-2.5 px-3 text-right">Total (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {invoice.items.map((it, idx) => (
                <tr key={it.id}>
                  <td className="py-3 px-3 text-sand-400">{idx + 1}</td>
                  <td className="py-3 px-3 font-medium text-espresso-900">{it.productName}</td>
                  <td className="py-3 px-3 font-mono text-sand-500">{it.hsnCode}</td>
                  <td className="py-3 px-3 text-center font-semibold">{it.quantity}</td>
                  <td className="py-3 px-3 text-right font-mono">{formatINR(it.taxableValue)}</td>
                  <td className="py-3 px-3 text-right text-sand-600">{it.gstRate}%</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-espresso-900">{formatINR(it.totalAmount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Breakdown */}
        <div className="flex justify-end pt-4 border-t-2 border-sand-300">
          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-sand-600">
              <span>Total Taxable Amount:</span>
              <span className="font-mono font-medium">{formatINR(invoice.taxableAmount)}</span>
            </div>

            {invoice.totalCgst > 0 && (
              <div className="flex justify-between text-sand-600">
                <span>Central GST (CGST 9%):</span>
                <span className="font-mono">{formatINR(invoice.totalCgst)}</span>
              </div>
            )}

            {invoice.totalSgst > 0 && (
              <div className="flex justify-between text-sand-600">
                <span>State GST (SGST 9%):</span>
                <span className="font-mono">{formatINR(invoice.totalSgst)}</span>
              </div>
            )}

            {invoice.totalIgst > 0 && (
              <div className="flex justify-between text-sand-600">
                <span>Integrated GST (IGST 18%):</span>
                <span className="font-mono">{formatINR(invoice.totalIgst)}</span>
              </div>
            )}

            {invoice.totalDiscount > 0 && (
              <div className="flex justify-between text-forest-700">
                <span>Trade Discount:</span>
                <span className="font-mono">- {formatINR(invoice.totalDiscount)}</span>
              </div>
            )}

            {invoice.deliveryCharges > 0 && (
              <div className="flex justify-between text-sand-600">
                <span>White-Glove Delivery & Installation:</span>
                <span className="font-mono">{formatINR(invoice.deliveryCharges)}</span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-3 border-t-2 border-espresso-800 text-sm font-bold text-espresso-900">
              <span className="uppercase tracking-wider">Grand Total:</span>
              <span className="font-serif text-xl text-brass-800 font-bold">{formatINR(invoice.grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Terms & Signature */}
        <div className="mt-14 pt-6 border-t border-sand-200 grid grid-cols-2 gap-8 text-[11px] text-sand-500">
          <div>
            <span className="font-bold text-espresso-900 block mb-1 uppercase tracking-wider">
              Terms & Conditions
            </span>
            <p>1. 10-Year warranty covers timber warping, joints, and wood-boring insects.</p>
            <p>2. Keep out of direct monsoon rain exposure; clean only with organic dry cloths.</p>
            <p>3. This is a computer-generated tax invoice generated on {formatDate(invoice.issueDate)}.</p>
          </div>

          <div className="text-right flex flex-col justify-end items-end">
            <div className="w-40 border-b border-espresso-800 mb-1" />
            <span className="font-semibold text-espresso-900">For {invoice.storeDetails.name}</span>
            <span className="text-[10px]">Authorized Signatory</span>
          </div>
        </div>
      </div>
    </div>
  );
}
