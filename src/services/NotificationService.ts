
/**
 * Service for sending notifications about orders
 */
export class NotificationService {
  /**
   * Send an email notification about a new order
   */
  static async sendEmailNotification(orderData: any): Promise<boolean> {
    try {
      // For this implementation, we're using EmailJS
      // You'll need to create an account at https://www.emailjs.com/
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_default', // Replace with your EmailJS service ID
          template_id: 'template_default', // Replace with your EmailJS template ID
          user_id: 'user_public_key', // Replace with your EmailJS user ID
          template_params: {
            to_email: 'vcarusobusiness@gmail.com',
            from_name: orderData.customer.name,
            from_email: orderData.customer.email,
            subject: 'Nuovo ordine da EdilP2',
            message: this.formatOrderMessage(orderData),
          },
        }),
      });

      return response.status === 200;
    } catch (error) {
      console.error("Error sending email notification:", error);
      return false;
    }
  }

  /**
   * Send a WhatsApp notification about a new order
   */
  static async sendWhatsAppNotification(orderData: any): Promise<boolean> {
    try {
      // Using CallMeBot API (free for limited usage)
      const phoneNumber = "393241527770"; // Format: country code + number without +
      
      // Format the message
      const message = this.formatOrderMessage(orderData);
      const encodedMessage = encodeURIComponent(message);
      
      // Note: CallMeBot requires a one-time setup before it will work
      // See: https://www.callmebot.com/blog/free-api-whatsapp-messages/
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}`;
      
      const response = await fetch(url);
      return response.status === 200;
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
      return false;
    }
  }

  /**
   * Format order data into a readable message
   */
  private static formatOrderMessage(orderData: any): string {
    const itemsList = orderData.items.map((item: any) => 
      `- ${item.name} (${item.quantity}x) - ${item.price}`
    ).join('\n');
    
    return `
      Nuovo ordine da EdilP2!
      
      Cliente: ${orderData.customer.name}
      Email: ${orderData.customer.email}
      Telefono: ${orderData.customer.phone}
      Data: ${new Date(orderData.orderDate).toLocaleString('it-IT')}
      
      ARTICOLI:
      ${itemsList}
      
      Totale: €${orderData.total.toFixed(2)}
      Totale con IVA (22%): €${(orderData.total * 1.22).toFixed(2)}
    `;
  }
}
