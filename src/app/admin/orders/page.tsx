"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Order } from "@/types/order";
import { getStoredOrders } from "@/lib/orderService";
import { formatINR, formatDate } from "@/lib/utils";
import { Badge, Input, Button } from "@/components/ui";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      ord.customer.phone.includes(search) ||
      ord.customer.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || ord.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter((o) => o.status === "BILLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingCount = orders.filter((o) => o.status === "ENQUIRY_RECEIVED").length;
  const billedCount = orders.filter((o) => o.status === "BILLED").length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand-200 pb-5">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900">
            Incoming Orders & WhatsApp Enquiries
          </h1>
          <p className="text-xs text-sand-500 mt-1">
            Review customer furniture requests, adjust itemized orders, and generate 1-click official GST bills.
          </p>
        </div>
        <Link href="/admin/invoices">
          <Button variant="secondary" size="sm">
            View All Finalized Invoices &rarr;
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-sm border border-sand-200 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-sand-500 block">
            Total Orders
          </span>
          <span className="font-serif text-2xl font-bold text-espresso-900 mt-1 block">
            {orders.length}
          </span>
        </div>

        <div className="bg-white p-5 rounded-sm border border-sand-200 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block">
            Pending Discussion
          </span>
          <span className="font-serif text-2xl font-bold text-amber-800 mt-1 block">
            {pendingCount}
          </span>
        </div>

        <div className="bg-white p-5 rounded-sm border border-sand-200 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-700 block">
            Billed Orders
          </span>
          <span className="font-serif text-2xl font-bold text-forest-700 mt-1 block">
            {billedCount}
          </span>
        </div>

        <div className="bg-white p-5 rounded-sm border border-sand-200 shadow-subtle">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brass-700 block">
            Billed Revenue
          </span>
          <span className="font-serif text-2xl font-bold text-espresso-900 mt-1 block">
            {formatINR(totalRevenue)}
          </span>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="bg-white p-4 rounded-sm border border-sand-200 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          <div className="max-w-md w-full">
            <Input
              placeholder="Search by customer, phone, order #, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 text-xs">
            {["ALL", "ENQUIRY_RECEIVED", "BILLED", "CANCELLED"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-2 rounded-sm font-semibold transition-colors ${
                  statusFilter === st
                    ? "bg-espresso-800 text-white"
                    : "bg-linen-100 text-espresso-700 hover:bg-sand-200"
                }`}
              >
                {st === "ALL"
                  ? "All"
                  : st === "ENQUIRY_RECEIVED"
                  ? "Enquiries"
                  : st === "BILLED"
                  ? "Billed"
                  : "Cancelled"}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-espresso-900 divide-y divide-sand-200">
            <thead className="bg-linen-100 text-sand-500 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Pieces</th>
                <th className="py-3 px-4">Estimated Value</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-sand-500">
                    No orders matching criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-linen-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-espresso-900">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3.5 px-4 text-sand-500 whitespace-nowrap">
                      {formatDate(ord.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-espresso-900">{ord.customer.fullName}</div>
                      <div className="text-[11px] text-sand-500">+91 {ord.customer.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-sand-600 truncate max-w-[150px]">
                      {ord.customer.city}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-espresso-800">
                      {ord.items.reduce((s, i) => s + i.quantity, 0)} items
                    </td>
                    <td className="py-3.5 px-4 font-bold text-espresso-900 whitespace-nowrap">
                      {formatINR(ord.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4">
                      {ord.status === "BILLED" ? (
                        <Badge variant="success">Billed</Badge>
                      ) : ord.status === "ENQUIRY_RECEIVED" ? (
                        <Badge variant="warning">Enquiry</Badge>
                      ) : (
                        <Badge variant="sand">{ord.status}</Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      <Link href={`/admin/orders/${ord.id}`}>
                        <button className="text-xs font-semibold text-espresso-900 hover:text-brass-600 bg-linen-100 hover:bg-sand-200 px-3 py-1.5 rounded-sm border border-sand-300 transition-colors">
                          Review & Bill &rarr;
                        </button>
                      </Link>
                      {ord.invoiceId && (
                        <Link href={`/admin/invoices/${ord.invoiceId}`}>
                          <button className="text-xs font-semibold text-forest-700 bg-forest-50 hover:bg-forest-100 px-2.5 py-1.5 rounded-sm border border-forest-500/20 transition-colors">
                            PDF Bill
                          </button>
                        </Link>
                      )}
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
