/* eslint-disable react/no-unescaped-entities */
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
  Link,
  Heading,
} from "@react-email/components";

const LOGO_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/logo.png`;
const DOCULOGO_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/doculogo.png`;
const DOCUSIGN_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/powered.png`;

function EmailLink() {
  return (
    <Html lang="en">
      <Head>
        <title>Document Review Request</title>
      </Head>
      <Body style={main}>
        <Container style={topContainer}>
          <Container style={blueContainer}>
            <Section style={centerSection}>
              <Img alt="logo" style={largeLogo} src={DOCULOGO_URL} />
            </Section>

            <Section style={textSection}>
              <Text style={headerText}>
                Flowco Solutions, sent you a document to review and sign.
              </Text>
            </Section>

            <Section style={buttonSection}>
              <Button
                style={button}
                href="https://aws-voice-note.s3.us-east-1.amazonaws.com/index.html"
              >
                REVIEW DOCUMENTS
              </Button>
            </Section>
          </Container>
          <Container style={messageContainer}>
            <Text style={messageText}>
              Please review all data within this document for accuracy. If you
              believe that this document contains any inaccurate data, please
              click on Ã¬Decline to SignÃ® in the top right hand corner of the
              screen.
            </Text>
            <Text style={messageText}>
              Thank You, <br />
              Flowco Solutions
            </Text>

            <Img src={DOCUSIGN_URL} style={smallLogo} />
          </Container>
        </Container>
        <Container>
          <Section>
            <Text style={footerText}>
              <span style={footerBoldText}> Do Not Share This Email </span>
              <br />
              <span style={footerNormalText}>
                This email contains a secure link to DocuSign. Please do not
                share this email, link, or access code with others.
              </span>
            </Text>
            <Text style={footerText}>
              <span style={footerBoldText}>Alternate Signing Method</span>
              <br />
              <span style={footerNormalText}>
                Visit DocuSign.com, click 'Access Documents', and enter the
                security code: CB14C8E388B743568D57F8574BCF23B13
              </span>
            </Text>
            <Text style={footerText}>
              <span style={footerBoldText}>About DocuSign</span>
              <br />
              <span style={footerNormalText}>
                Sign documents electronically in just minutes. It's safe,
                secure, and legally binding. Whether you're in an office, at
                home, on-the-go -- or even across the globe -- DocuSign provides
                a professional trusted solution for Digital Transaction
                ManagementÃ ́.
              </span>
            </Text>
            <Text style={footerText}>
              <span style={footerBoldText}>Questions about the Document?</span>
              <br />
              <span style={footerNormalText}>
                If you need to modify the document or have questions about the
                details in the document, please reach out to the sender by
                emailing them directly.
              </span>
            </Text>
            <Text style={footerText}>
              <span style={footerNormalText}>
                If you are having trouble signing the document, please visit the{" "}
                <Link>Help with Signing </Link>
                page on our <Link>Support Center.</Link>
              </span>
            </Text>
            <Section style={appSection}>
              <Img src={LOGO_URL} style={appLogo} />
              <Link style={appLink}>Download the DocuSign App</Link>
            </Section>
            <Heading as="h6" style={disclaimer}>
              This message was sent to you by Flowco Solutions who is using the
              DocuSign Electronic Signature Service. If you would rather not
              receive email from this sender you may contact the sender with
              your request.
            </Heading>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#EAEAEA",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
} as const;

const topContainer = {
  backgroundColor: "#ffffff",
  marginTop: "12px",
};

const blueContainer = {
  backgroundColor: "#1E4CA1",
  margin: "12px auto 40px auto",
  width: "560px", // 35rem
};

const centerSection = {
  margin: "0 auto",
};

const largeLogo = {
  height: "80px",
  margin: "0 auto",
};

const textSection = {
  textAlign: "center" as const,
};

const headerText = {
  color: "white",
  fontWeight: "600",
  fontSize: "14px",
};

const buttonSection = {
  textAlign: "center" as const,
  marginBottom: "16px",
};

const button = {
  backgroundColor: "#FF8002",
  textAlign: "center" as const,
  color: "#fff",
  fontSize: "12px",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block",
  padding: "12px 24px",
};

const messageContainer = {
  marginBottom: "16px",
};

const messageText = {
  padding: "0 16px",
};

const smallLogo = {
  height: "24px",
};

const footerText = {
  padding: "0 24px",
  margin: 0,
};

const footerBoldText = {
  color: "#666666",
  fontWeight: "bold",
  fontSize: "12px",
};

const footerNormalText = {
  color: "#666666",
  fontSize: "12px",
};

const appSection = {
  display: "flex",
  flexDirection: "row" as const,
  padding: "0 24px 8px 24px",
};

const appLogo = {
  height: "32px",
};

const appLink = {
  textDecoration: "underline",
};

const disclaimer = {
  padding: "0 24px",
  fontSize: "10px",
  color: "#666666",
  marginBottom: "16px",
};

export default EmailLink;
