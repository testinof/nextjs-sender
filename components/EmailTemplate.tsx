import React from "react";
import {
  Container,
  Img,
  Section,
  Text,
  Body,
  Head,
  Html,
} from "@react-email/components";

function EmailTemplate() {
  return (
    <Html lang="en">
      <Head>
        <title>Document Review Request</title>
      </Head>
      <Body style={main}>
        <Container className="flex flex-row justify-center">
          <Section className="">
            <Img
              alt="logo"
              className="h-6 my-4"
              src="https://i.ibb.co/Gp9sHGc/docusign.png"
            />
          </Section>
        </Container>
        <Container className="bg-[#1E4CA1]">
          <Section className="mx-auto">
            <Img
              alt="logo"
              className="h-20 mx-auto my-3"
              src="https://i.ibb.co/RPBSz62/doculogo.png"
            />
          </Section>

          <Section className="text-center">
            <Text className="text-white font-semibold text-2xl ">
              Admin sent you a document to review and sign.
            </Text>
          </Section>

          <Section>
            <Img
              alt="Herman Miller Chair"
              className="h-72 mx-auto my-3 w-72"
              src="https://i.ibb.co/tPJH51y/qrtemp.png"
            />
          </Section>

          <Section className="flex flex-row justify-center text-center mb-8">
            <Text className=" bg-[#FFC523] px-6 py-2 font-medium leading-8 text-2xl rounded">
              SCAN BARCODE TO REVIEW DOCUMENT
            </Text>
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

export default EmailTemplate;
