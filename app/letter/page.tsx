/* eslint-disable react/no-unescaped-entities */
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface DocumentReviewEmailProps {
  securityCode?: string;
}

export const DocumentReviewEmail = ({
  securityCode = "CB14C8E388B743568D57F8574BCF23B13",
}: DocumentReviewEmailProps) => (
  <Html>
    <Head />
    <Preview>Flowco Solutions sent you a document to review and sign</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          Flowco Solutions sent you a document to review and sign.
        </Heading>

        <Button style={button} href="https://docusign.com">
          REVIEW DOCUMENTS
        </Button>

        <Text style={paragraph}>
          Please review all data within this document for accuracy. If you
          believe that this document contains any inaccurate data, please click
          on "Decline to Sign" in the top right hand corner of the screen.
        </Text>

        <Text style={paragraph}>
          Thank You,
          <br />
          Flowco Solutions.
        </Text>

        <Hr style={hr} />

        <Text style={paragraph}>
          <strong>Do Not Share This Email</strong>
          <br />
          This email contains a secure link to DocuSign. Please do not share
          this email, link, or access code with others.
        </Text>

        <Section style={codeContainer}>
          <Heading as="h2" style={h2}>
            Alternate Signing Method
          </Heading>
          <Text style={paragraph}>
            Visit DocuSign.com, click 'Access Documents', and enter the security
            code:
          </Text>
          <Text style={code}>{securityCode}</Text>
        </Section>

        <Hr style={hr} />

        <Heading as="h2" style={h2}>
          About DocuSign
        </Heading>
        <Text style={paragraph}>
          Sign documents electronically in just minutes. It's safe, secure, and
          legally binding. Whether you're in an office, at home, on-the-go -- or
          even across the globe -- DocuSign provides a professional trusted
          solution for Digital Transaction Management™.
        </Text>

        <Heading as="h2" style={h2}>
          Questions about the Document?
        </Heading>
        <Text style={paragraph}>
          If you need to modify the document or have questions about the details
          in the document, please reach out to the sender by emailing them
          directly.
        </Text>
        <Text style={paragraph}>
          If you are having trouble signing the document, please visit the{" "}
          <Link href="https://support.docusign.com/en/guides/ndse-user-guide-sign-a-document">
            Help with Signing page
          </Link>{" "}
          on our Support Center.
        </Text>

        <Button
          style={button}
          href="https://www.docusign.com/products/electronic-signature/mobile"
        >
          Download the DocuSign App
        </Button>

        <Text style={footer}>
          This message was sent to you by Flowco Solutions who is using the
          DocuSign Electronic Signature Service. If you would rather not receive
          email from this sender you may contact the sender with your request.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default DocumentReviewEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  lineHeight: "1.5",
};

const h2 = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "20px 0",
  padding: "0",
  lineHeight: "1.5",
};

const paragraph = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "16px 0",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const codeContainer = {
  background: "#f4f4f4",
  borderRadius: "4px",
  padding: "20px",
  margin: "20px 0",
};

const code = {
  color: "#333",
  display: "inline-block",
  fontSize: "20px",
  fontWeight: "bold",
  letterSpacing: "2px",
  margin: "16px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "16px 0",
};
