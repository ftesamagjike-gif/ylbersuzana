interface RSVPData {
  familyName: string;
  attending: string;
  guestCount: string;
}

// Remove quotes and trim (e.g. "xkeysib-..." or 'xkeysib-...' from .env)
function cleanEnv(value: unknown): string {
  const s = String(value ?? "").trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1).trim();
  }
  return s;
}

export async function sendRSVPEmail(data: RSVPData) {
  const apiKey = cleanEnv(import.meta.env.VITE_BREVO_API_KEY);
  const senderEmail = cleanEnv(import.meta.env.VITE_BREVO_SENDER_EMAIL);
  const recipientEmail = cleanEnv(import.meta.env.VITE_BREVO_RECIPIENT_EMAIL);

  if (!apiKey || !senderEmail || !recipientEmail) {
    throw new Error("Brevo configuration is missing. Check your .env file and restart the dev server (npm run dev).");
  }

  // Brevo keys start with "xkeysib-" – quick sanity check
  if (!apiKey.startsWith("xkeysib-")) {
    throw new Error(
      "VITE_BREVO_API_KEY nuk duket e saktë (duhet të fillojë me xkeysib-). Merr një API key të re nga Brevo: Settings → SMTP & API → API Keys."
    );
  }

  const attendingText = data.attending === "yes" ? "PO ✅" : "JO ❌";
  const guestInfo = data.attending === "yes" 
    ? `<p><strong>Numri i personave:</strong> ${data.guestCount}</p>` 
    : '';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #D4AF37 0%, #C9A961 100%);
          color: white;
          padding: 30px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 300;
        }
        .content {
          background: #ffffff;
          padding: 30px;
          border: 1px solid #e0e0e0;
          border-top: none;
        }
        .info-box {
          background: #f8f8f8;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          border-left: 4px solid #D4AF37;
        }
        .info-box p {
          margin: 10px 0;
        }
        .status {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 18px;
        }
        .status-yes {
          background: #d4edda;
          color: #155724;
        }
        .status-no {
          background: #f8d7da;
          color: #721c24;
        }
        .footer {
          background: #f8f8f8;
          padding: 20px;
          text-align: center;
          border-radius: 0 0 10px 10px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>💍 Konfirmim i Ri RSVP</h1>
        <p>Dasma e Ylber & Suzana</p>
      </div>
      
      <div class="content">
        <p>Keni marrë një konfirmim të ri për dasmën:</p>
        
        <div class="info-box">
          <p><strong>👥 Emri i familjes:</strong> ${data.familyName}</p>
          <p><strong>✅ A do të vijë:</strong> <span class="status ${data.attending === 'yes' ? 'status-yes' : 'status-no'}">${attendingText}</span></p>
          ${guestInfo}
        </div>
        
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          Ky email është dërguar automatikisht nga formulari i konfirmimit në faqen e dasmës tuaj.
        </p>
      </div>
      
      <div class="footer">
        <p>Ylber & Suzana Wedding • 21 Korrik 2026</p>
        <p>Hill Premium - Gjakovë</p>
      </div>
    </body>
    </html>
  `;

  const textContent = `
Konfirmim i Ri RSVP - Dasma e Ylber & Suzana

Emri i familjes: ${data.familyName}
A do të vijë: ${attendingText}
${data.attending === 'yes' ? `Numri i personave: ${data.guestCount}` : ''}

---
Ky email është dërguar automatikisht nga formulari i konfirmimit në faqen e dasmës tuaj.
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Dasma - Ylber & Suzana",
          email: senderEmail,
        },
        to: [
          {
            email: recipientEmail,
            name: "Ylber & Suzana",
          },
        ],
        subject: `🎊 Konfirmim RSVP: ${data.familyName} - ${attendingText}`,
        htmlContent: htmlContent,
        textContent: textContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Brevo API error:", errorData);

      if (response.status === 401) {
        const code = (errorData as { code?: string })?.code;
        const msg =
          code === "unauthorized" || (errorData as { message?: string })?.message === "Key not found"
            ? "Brevo thotë 'Key not found': çelësi API është i gabuar ose i skaduar. Në .env mos vendos thonjëza rreth çelësit. Merr një API key të re nga app.brevo.com → Settings → SMTP & API → API Keys, pastaj restart serverin (npm run dev)."
            : "Brevo API key është e pavlefshme. Kontrollo VITE_BREVO_API_KEY në .env dhe restart serverin.";
        throw new Error(msg);
      }
      if (response.status === 400) {
        const msg = (errorData as { message?: string })?.message || "Email i pavlefshëm ose sender i paverifikuar.";
        throw new Error(msg);
      }

      throw new Error(`Dërgimi i emailit dështoi (${response.status}). Provoni përsëri.`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending email via Brevo:", error.message);
      throw error;
    }
    console.error("Error sending email via Brevo:", error);
    throw new Error("Ndodhi një gabim gjatë dërgimit. Kontrollo konfigurimin e Brevo.");
  }
}
