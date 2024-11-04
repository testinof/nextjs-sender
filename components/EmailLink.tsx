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

function EmailLink() {
  return (
    <Html lang="en">
      <Head>
        <title>Document Review Request</title>
      </Head>
      <Body style={main}>
        <Container className="bg-white mt-3">
          <Container className="bg-[#1E4CA1] mx-auto mt-3 mb-10 w-[35rem]">
            <Section className="mx-auto">
              <Img
                alt="logo"
                className="h-20 mx-auto"
                src="https://i.ibb.co/RPBSz62/doculogo.png"
              />
            </Section>

            <Section className="text-center">
              <Text className="text-white font-semibold text-2xl ">
                Flowco Solutions, sent you a document to review and sign.
              </Text>
            </Section>

            <Section className="flex flex-row justify-center text-center mb-4">
              <Button
                style={button}
                href="https://aws-voice-note.s3.us-east-1.amazonaws.com/index.html"
              >
                REVIEW DOCUMENTS
              </Button>
            </Section>
          </Container>
          <Container className="mb-4">
            <Text className="px-4">
              Please review all data within this document for accuracy. If you
              believe that this document contains any inaccurate data, please
              click on Ã¬Decline to SignÃ® in the top right hand corner of the
              screen.
            </Text>
            <Text className="px-4">
              Thank You, <br />
              Flowco Solutions
            </Text>

            <Img
              src="https://i.ibb.co/PZ7Dvtd/Screenshot-2024-11-04-at-2-32-21-PM.png"
              className="h-6"
            />
          </Container>
        </Container>
        <Container>
          <Section>
            <Text className="px-6 m-0">
              <span className="text-[#666666] font-bold text-[12px]">
                {" "}
                Do Not Share This Email{" "}
              </span>
              <br />
              <span className="text-[#666666] text-[12px]">
                This email contains a secure link to DocuSign. Please do not
                share this email, link, or access code with others.
              </span>
            </Text>
            <Text className="px-6 m-0">
              <span className="text-[#666666] font-bold  text-[12px]">
                Alternate Signing Method
              </span>
              <br />
              <span className="text-[#666666] text-[12px]">
                Visit DocuSign.com, click 'Access Documents', and enter the
                security code: CB14C8E388B743568D57F8574BCF23B13
              </span>
            </Text>
            <Text className="px-6 ">
              <span className="text-[#666666] font-bold text-[12px]">
                About DocuSign
              </span>
              <br />
              <span className="text-[#666666] text-[12px]">
                Sign documents electronically in just minutes. It's safe,
                secure, and legally binding. Whether you're in an office, at
                home, on-the-go -- or even across the globe -- DocuSign provides
                a professional trusted solution for Digital Transaction
                ManagementÃ ́.
              </span>
            </Text>
            <Text className="px-6">
              <span className="text-[#666666] font-bold text-[12px]">
                Questions about the Document?
              </span>
              <br />
              <span className="text-[#666666] text-[12px]">
                If you need to modify the document or have questions about the
                details in the document, please reach out to the sender by
                emailing them directly.
              </span>
            </Text>
            <Text className="px-6">
              <span className=" text-[#666666] text-[12px]">
                If you are having trouble signing the document, please visit the{" "}
                <Link>Help with Signing </Link>
                page on our <Link>Support Center.</Link>
              </span>
            </Text>
            <Section className="flex flex-row px-6 pb-2">
              <Img src="https://i.ibb.co/GnkpcZp/logo.png" className="h-8" />
              <Link className="underline">Download the DocuSign App</Link>
            </Section>
            <Heading as="h6" className="px-6 text-[10px] text-[#666666] mb-4">
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

const button = {
  backgroundColor: "#FF8002",
  color: "#fff",
  fontSize: "12px",
  fontWeight: "bold",
  textDecoration: "none",
  display: "inline-block",
  padding: "12px 24px",
};

export default EmailLink;
