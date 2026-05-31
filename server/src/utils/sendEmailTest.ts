import "dotenv/config";
import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;

console.log("KEY:", key);

if (!key) {
  throw new Error("Missing RESEND_API_KEY");
}

const resend = new Resend(key);

export const sendTestEmail = async () => {
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "aljosabos@gmail.com",
    subject: "Test email",
    html: "<h1>Email radi 🚀</h1>",
  });

  console.log(result);
};
