/**
 * Meta WhatsApp Cloud API Service
 * Handles automated dispatch of WhatsApp notifications to the store owner and customers.
 */

interface SendWhatsAppMessageParams {
  to: string; // e.g. "919876543210"
  message: string;
}

interface OrderNotificationData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryCity: string;
  deliveryAddress: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}

export class WhatsAppService {
  private static token = process.env.WHATSAPP_API_TOKEN;
  private static phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  private static adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || "919999999999";

  /**
   * Dispatches a raw text message via Meta WhatsApp Cloud API
   */
  private static async sendRawMessage({ to, message }: SendWhatsAppMessageParams): Promise<boolean> {
    const cleanPhone = to.replace(/[^0-9]/g, "");

    // If API credentials are not set (e.g. during dev), log to console safely
    if (!this.token || !this.phoneNumberId) {
      console.log(`[WHATSAPP DISPATCH SIMULATION]`);
      console.log(`To: +${cleanPhone}`);
      console.log(`Message:
${message}`);
      console.log(`-----------------------------------------------`);
      return true;
    }

    try {
      const endpoint = `https://graph.facebook.com/v19.0/${this.phoneNumberId}/messages`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: cleanPhone,
          type: "text",
          text: { preview_url: false, body: message },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("WhatsApp API dispatch error:", errorData);
        return false;
      }

      return true;
    } catch (err) {
      console.error("WhatsApp API network error:", err);
      return false;
    }
  }

  /**
   * 1. Sends automated notification to the Shop Owner/Admin upon order placement
   */
  public static async notifyAdminNewOrder(data: OrderNotificationData): Promise<boolean> {
    const itemsSummary = data.items
      .map((it) => `• ${it.quantity}x ${it.name} (₹${it.price.toLocaleString("en-IN")})`)
      .join("\n");

    const message = `📦 *New Furniture Enquiry: ${data.orderNumber}*\n\n` +
      `*Customer:* ${data.customerName}\n` +
      `*Phone:* +91 ${data.customerPhone}\n` +
      `*Delivery City:* ${data.deliveryCity}\n` +
      `*Address:* ${data.deliveryAddress}\n\n` +
      `*Selected Pieces:*\n${itemsSummary}\n\n` +
      `*Total Estimated Value:* ₹${data.totalAmount.toLocaleString("en-IN")}\n\n` +
      `👉 Open staff portal to review and generate bill.`;

    return this.sendRawMessage({ to: this.adminPhone, message });
  }

  /**
   * 2. Sends automated acknowledgement message to the customer
   */
  public static async sendCustomerConfirmation(data: OrderNotificationData): Promise<boolean> {
    const message = `Hello ${data.customerName},\n\n` +
      `Thank you for reaching out to *[CLIENT_NAME] Atelier*! We have received your furniture enquiry (*${data.orderNumber}*).\n\n` +
      `Our master craftsman is reviewing the timber availability and polish specifications for your selected pieces. We will contact you shortly on this number to confirm delivery details.\n\n` +
      `Best regards,\n` +
      `*[CLIENT_NAME] Workshop Team*`;

    return this.sendRawMessage({ to: data.customerPhone, message });
  }
}
