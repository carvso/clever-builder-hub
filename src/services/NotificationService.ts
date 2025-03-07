
/**
 * Service for sending notifications about orders
 */
export class NotificationService {
  /**
   * Send an email notification about a new order
   */
  static async sendEmailNotification(orderData: any): Promise<boolean> {
    console.log("Attempting to send email notification", orderData);
    try {
      // Using EmailJS service
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
            from_name: orderData.customer.name || 'Cliente EdilP2',
            from_email: orderData.customer.email || 'noreply@edilp2.it',
            subject: 'Nuovo ordine da EdilP2',
            message: this.formatOrderMessage(orderData),
          },
        }),
      });

      console.log("Email notification response:", response.status);
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
    console.log("Attempting to send WhatsApp notification", orderData);
    try {
      // Using CallMeBot API (free for limited usage)
      const phoneNumber = "393241527770"; // Format: country code + number without +
      
      // Format the message
      const message = this.formatOrderMessage(orderData);
      const encodedMessage = encodeURIComponent(message);
      
      // Add API key parameter (CallMeBot requires this)
      const apiKey = "123456"; // Replace with your CallMeBot API key if you have one
      
      // Note: CallMeBot requires a one-time setup before it will work
      // See: https://www.callmebot.com/blog/free-api-whatsapp-messages/
      const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${encodedMessage}&apikey=${apiKey}`;
      
      console.log("Sending WhatsApp notification to URL:", url);
      const response = await fetch(url);
      console.log("WhatsApp notification response:", response.status);
      return response.status === 200;
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
      return false;
    }
  }

  /**
   * Test both notification methods and return results
   */
  static async testNotifications(): Promise<{email: boolean, whatsapp: boolean}> {
    const testData = {
      customer: {
        name: "Test User",
        email: "test@example.com",
        phone: "+1234567890"
      },
      items: [
        {
          name: "Test Product",
          quantity: 1,
          price: "10.00"
        }
      ],
      total: 10.00,
      orderDate: new Date().toISOString()
    };
    
    const emailResult = await this.sendEmailNotification(testData);
    const whatsappResult = await this.sendWhatsAppNotification(testData);
    
    return {email: emailResult, whatsapp: whatsappResult};
  }

  /**
   * Format order data into a readable message
   */
  private static formatOrderMessage(orderData: any): string {
    if (!orderData || !orderData.items || !Array.isArray(orderData.items)) {
      console.error("Invalid order data format:", orderData);
      return "Nuovo ordine ricevuto (dati non disponibili)";
    }
    
    try {
      const itemsList = orderData.items.map((item: any) => 
        `- ${item.name || 'Prodotto'} (${item.quantity || 0}x) - ${item.price || '0.00'}`
      ).join('\n');
      
      return `
        Nuovo ordine da EdilP2!
        
        Cliente: ${orderData.customer?.name || 'N/A'}
        Email: ${orderData.customer?.email || 'N/A'}
        Telefono: ${orderData.customer?.phone || 'N/A'}
        Data: ${new Date(orderData.orderDate).toLocaleString('it-IT')}
        
        ARTICOLI:
        ${itemsList}
        
        Totale: €${(orderData.total || 0).toFixed(2)}
        Totale con IVA (22%): €${((orderData.total || 0) * 1.22).toFixed(2)}
      `;
    } catch (error) {
      console.error("Error formatting order message:", error);
      return "Nuovo ordine ricevuto (errore nel formato)";
    }
  }
}
