import React from "react";
import {
  Container,
  Img,
  Section,
  Text,
  Body,
  Head,
  Html,
  Button,
} from "@react-email/components";

export default function EmailTemplate() {
  // Convert the imported images to URLs
  const LOGO_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/doculogo.png`;
  const QR_CODE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/docuqr.png`;
  const DOCUSIGN_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/docusign.png`;

  return (
    <Html lang="en">
      <Head>
        <title>Document Review Request</title>
      </Head>
      <Body style={main}>
        <Container style={containerStyle}>
          <Section style={logoSection}>
            <Img alt="logo" style={smallLogo} src={DOCUSIGN_URL} />
          </Section>
        </Container>
        <Container style={blueContainer}>
          <Section style={centerSection}>
            <Img alt="logo" style={largeLogo} src={LOGO_URL} />
          </Section>

          <Section style={textSection}>
            <Text style={headerText}>
              Admin sent you a document to review and sign.
            </Text>
          </Section>

          <Section>
            <Img alt="QR Code" style={qrCode} src={QR_CODE_URL} />
          </Section>

          <Section style={buttonSection}>
            <Button style={scanButton}>SCAN BARCODE TO REVIEW DOCUMENT</Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
} as const;

const containerStyle = {
  display: "flex",
  flexDirection: "row" as const,
  justifyContent: "center",
};

const logoSection = {
  textAlign: "center" as const,
};

const smallLogo = {
  height: "24px", // h-6
  margin: "16px 0", // my-4
};

const blueContainer = {
  backgroundColor: "#1E4CA1",
};

const centerSection = {
  margin: "0 auto",
};

const largeLogo = {
  height: "80px", // h-20
  margin: "12px auto", // my-3 mx-auto
};

const textSection = {
  textAlign: "center" as const,
};

const headerText = {
  color: "white",
  fontWeight: "600",
  fontSize: "14px", // text-2xl
};

const qrCode = {
  height: "288px", // h-72
  width: "288px", // w-72
  margin: "12px auto", // my-3 mx-auto
};

const buttonSection = {
  textAlign: "center" as const,
  marginBottom: "32px", // mb-8
};

const scanButton = {
  backgroundColor: "#FFC523",
  padding: "8px 24px", // px-6 py-2
  fontWeight: "500",
  lineHeight: "12px", // leading-8
  fontSize: "12px", // text-2xl
  borderRadius: "4px", // rounded

  textAlign: "center" as const,
};
