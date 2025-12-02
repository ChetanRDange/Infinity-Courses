import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const emailList = ["contact@immortalgroups.com","info@magas.services"];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dangechetan3@gmail.com",
    pass: "fuxk lwzd gfho zxcv",
  },
});

const mailOptions = {
  from: "dangechetan3@gmail.com",
  subject:
    "Application for Full Stack Developer / MERN Stack Developer Position",
  text: `Dear Hiring Manager,

Hope you're doing well! I'm actively looking for a MERN Stack Developer / Full Stack Developer position at your organization. I have almost 1 year of professional experience in building scalable, secure, and high-performance web applications using the MERN stack.

Currently, I am working as a Full Stack Developer at Mounarch Tech Solutions & Systems Pvt. Ltd., where I have contributed to multiple enterprise-level projects, including:

1. Tenant Web Panel
   Multi-tenant visitor management system with JWT authentication, real-time Govt. API verification (Aadhaar / PAN / DL / Passport), QR-based e-pass, Razorpay integration, invoice generation, and security monitoring.
   Live Link: https://vocoxp.staffhandler.com/vocoxp/tenant/tenant_frontend

2. Nagpur-Goa Shaktipeeth Land Acquisition System
   Scalable REST APIs for 802 km expressway land acquisition with geospatial mapping, multi-role authentication, workflow engine, dynamic dashboards, and PDF automation.
   Live Link: https://shaktipeeth.staffhandler.com/

3. CIDCO Property Management System
   Map-based property survey system using React, Node.js, MySQL, Leaflet, KML/KMZ mapping, dynamic forms, and secure role-based workflows.
   Live Link: https://propertysurveyor.staffhandler.com/

Technical Skills:
React.js, Node.js, Express.js, SQL/PostgreSQL, MongoDB, Redux Toolkit, RTK Query, JWT Auth, REST APIs, Tailwind CSS, Postman, Git & GitHub.

I previously worked as a React.js Developer Intern at Dreams International, and I hold a Bachelor of Computer Science (CGPA: 8.13/10) from SPPU University. I am actively seeking a stable and growth-oriented role where I can contribute effectively and continue learning.

I have attached my resume for your review, and I would appreciate the opportunity to interview and discuss how I can add value to your team.

Thank you for your time and consideration.
Looking forward to a positive response.

Warm regards,
Chetan Radhakisan Dange
Email: dangechetan3@gmail.com
Phone: +91 8459011161
LinkedIn: https://www.linkedin.com/in/chetan-dange
GitHub: https://github.com/ChetanRDange
Location: Pune, Maharashtra, India`,
  attachments: [
    {
      filename: "Chetan_Dange_Resume.pdf",
      path: path.join(__dirname, "chetan dange resume.pdf"),
      contentType: "application/pdf",
    },
  ],
};

async function sendEmails() {
  for (const email of emailList) {
    try {
      await transporter.sendMail({ ...mailOptions, to: email });
      console.log(`Email sent to => ${email}`);
    } catch (error) {
      console.error(`Failed to send to ${email}:`, error.message);
    }
  }
}

sendEmails()
  .then(() => console.log("\nAll emails sent successfully!"))
  .catch((err) => console.error("Error:", err));
