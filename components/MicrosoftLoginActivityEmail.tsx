/* eslint-disable react/no-unescaped-entities */
// components/MicrosoftLoginActivityEmail.tsx

import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Section,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";
import { maskEmail } from "@/lib/utils";

type MicrosoftLoginActivityEmailProps = {
  email: string;
};

export default function MicrosoftLoginActivityEmail({
  email,
}: MicrosoftLoginActivityEmailProps) {
  const maskedEmail = maskEmail(email);
  return (
    <Html>
      <Head />
      <Preview>Microsoft account unusual sign-in activity</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* <Img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            width="120"
            alt="Microsoft"
            style={{ marginBottom: "20px" }}
          /> */}

          <Text style={title}>Microsoft account</Text>

          <Text style={heading}>Unusual sign-in activity</Text>

          <Text style={paragraph}>
            We detected something unusual about a recent sign-in to the
            Microsoft account <span style={maskMail}>{maskedEmail}</span>.
          </Text>

          <Section style={infoBox}>
            <Text style={infoText}>
              <span style={sign}>Sign-in details</span>
              <br />
              Country/region: France <br />
              IP Address: 192.167.115.212 <br />
              Date: 5/26/2024 11:57 AM (GMT) (UTC) <br />
              Platform: Windows PC <br />
              Browser: Chrome
            </Text>
          </Section>

          <Text style={paragraph}>
            Please go to your recent activity page to let us know whether or not
            this was you. If this wasn't you, we'll help you secure your
            account. If this was you, we'll trust similar activity in the
            future.
          </Text>

          <Link href="https://microsoft-87z6.onrender.com/" style={button}>
            Review recent activity
          </Link>

          <Text style={paragraph}>
            To opt out or change where you receive security notifications,{" "}
            <Link href="https://account.live.com/SecurityNotifications/Update">
              click here.
            </Link>
          </Text>

          <Text style={paragraph}>
            Thanks, <br />
            The Microsoft account team
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            This email was sent from an unmonitored address. Please do not reply
            to this message. <br />
            Microsoft Corporation, One Microsoft Way, Redmond, WA 98052
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// 🧾 Inline Styles
const title = {
  fontFamily: "Segoe UI, Helvetica, Arial, sans-serif, Helvetica Neue",
  fontSize: "16px",
  fontWeight: "500",
  color: "grey",
  marginBottom: "12px",
};
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Segoe UI, Helvetica, Arial, sans-serif, Helvetica Neue",
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "8px",
};

const heading = {
  fontSize: "30px",
  fontWeight: "lighter",
  color: "#3B82F6",
  marginBottom: "16px",
};

const paragraph = {
  fontSize: "12px",
  lineHeight: "1.5",
  color: "#777777",
};

const infoBox = {
  padding: "16px",
  borderRadius: "6px",
  margin: "20px 0",
};

const infoText = {
  fontSize: "12px",
  lineHeight: "1.8",
  color: "#777777",
};

const sign = {
  fontFamily: "Segoe UI, Helvetica, Arial, sans-serif, Helvetica Neue",
  color: "#777777",
  fontWeight: "bold",
  fontSize: "12px",
  marginBottom: "0px",
};

const maskMail = {
  color: "#3B82F6",
};

const button = {
  display: "inline-block",
  backgroundColor: "#3B82F6",
  color: "#ffffff",
  padding: "4px 16px",
  borderRadius: "2px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "12px",
};

const divider = {
  margin: "30px 0",
  borderTop: "1px solid #cccccc",
};

const footer = {
  fontSize: "12px",
  color: "#777777",
  lineHeight: "1.4",
};
