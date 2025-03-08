
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Twilio } from "https://deno.land/x/twilio@1.0.2/mod.ts";
import sendgrid from "https://deno.land/x/sendgrid@0.0.3/mod.ts";

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id?: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  totalWithIva: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

// Function to format the order into a readable message
function formatOrderMessage(order: Order): string {
  try {
    const itemsList = order.items.map((item) => 
      `- ${item.name || 'Prodotto'} (${item.quantity || 0}x) - ${item.price || '0.00'}`
    ).join('\n');
    
    return `
      Nuovo ordine da EdilP2!
      
      Cliente: ${order.customer?.name || 'N/A'}
      Email: ${order.customer?.email || 'N/A'}
      Telefono: ${order.customer?.phone || 'N/A'}
      Data: ${new Date(order.orderDate).toLocaleString('it-IT')}
      
      ARTICOLI:
      ${itemsList}
      
      Totale: €${(order.total || 0).toFixed(2)}
      Totale con IVA (22%): €${(order.totalWithIva || 0).toFixed(2)}
      ${order.notes ? `\nNote: ${order.notes}` : ''}
    `;
  } catch (error) {
    console.error("Error formatting order message:", error);
    return "Nuovo ordine ricevuto (errore nel formato)";
  }
}

// Function to send an email notification
async function sendEmailNotification(order: Order): Promise<boolean> {
  try {
    console.log("Sending email notification for order:", order.id);
    
    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    const STORE_EMAIL = Deno.env.get("STORE_EMAIL") || "vcarusobusiness@gmail.com";
    
    if (!SENDGRID_API_KEY) {
      throw new Error("SendGrid API Key not found in environment variables");
    }
    
    sendgrid.init(SENDGRID_API_KEY);
    
    // Format the message body
    const messageBody = formatOrderMessage(order);
    
    // Send email to store owner
    const ownerEmailSent = await sendgrid.send({
      to: STORE_EMAIL,
      from: "noreply@edilp2.com",
      subject: `Nuovo Ordine #${order.id} - EdilP2`,
      text: messageBody,
      html: messageBody.replace(/\n/g, "<br>"),
    });
    
    console.log("Email to owner sent:", ownerEmailSent);
    
    // Send confirmation email to customer
    if (order.customer.email) {
      const customerEmailSent = await sendgrid.send({
        to: order.customer.email,
        from: "noreply@edilp2.com",
        subject: "Conferma Ordine - EdilP2",
        text: `
          Gentile ${order.customer.name},
          
          Grazie per il tuo ordine! Abbiamo ricevuto la tua richiesta e la stiamo elaborando.
          
          Dettagli Ordine:
          ${messageBody}
          
          Ti contatteremo presto per confermare i dettagli e organizzare il ritiro.
          
          Grazie per aver scelto EdilP2!
        `,
        html: `
          <h2>Gentile ${order.customer.name},</h2>
          <p>Grazie per il tuo ordine! Abbiamo ricevuto la tua richiesta e la stiamo elaborando.</p>
          <h3>Dettagli Ordine:</h3>
          <p>${messageBody.replace(/\n/g, "<br>")}</p>
          <p>Ti contatteremo presto per confermare i dettagli e organizzare il ritiro.</p>
          <p>Grazie per aver scelto EdilP2!</p>
        `,
      });
      
      console.log("Confirmation email to customer sent:", customerEmailSent);
    }
    
    return true;
  } catch (error) {
    console.error("Error sending email notification:", error);
    return false;
  }
}

// Function to send a WhatsApp notification
async function sendWhatsAppNotification(order: Order): Promise<boolean> {
  try {
    console.log("Sending WhatsApp notification for order:", order.id);
    
    const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
    const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
    const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER");
    const STORE_PHONE_NUMBER = Deno.env.get("STORE_PHONE_NUMBER") || "+393241527770";
    
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      throw new Error("Twilio credentials not found in environment variables");
    }
    
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    
    // Format the message
    const messageBody = formatOrderMessage(order);
    
    // Send WhatsApp message
    const message = await client.messages.create({
      body: messageBody,
      from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${STORE_PHONE_NUMBER}`
    });
    
    console.log("WhatsApp message sent, SID:", message.sid);
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    return false;
  }
}

serve(async (req) => {
  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the request body
    const { orderId } = await req.json();
    
    if (!orderId) {
      return new Response(
        JSON.stringify({ success: false, error: "Order ID is required" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Get the order from the database
    const { data: order, error } = await supabaseClient
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();
    
    if (error || !order) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error?.message || "Order not found" 
        }),
        { headers: { "Content-Type": "application/json" }, status: 404 }
      );
    }
    
    // Send notifications
    const emailResult = await sendEmailNotification(order as Order);
    const whatsappResult = await sendWhatsAppNotification(order as Order);
    
    // Update order status if notifications were sent
    if (emailResult || whatsappResult) {
      const { error: updateError } = await supabaseClient
        .from("orders")
        .update({ status: "confirmed" })
        .eq("id", orderId);
      
      if (updateError) {
        console.error("Error updating order status:", updateError);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        email: emailResult,
        whatsapp: whatsappResult,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in Edge Function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
