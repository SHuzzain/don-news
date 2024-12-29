import { ScrollView, View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { H2, H3, H4, P, Small } from "@/components/ui/typography";
import SectionView from "@/components/layout/section-view";

export default function TermAndAgreenmentCard() {
  return (
    <View className="flex-1 bg-background p-5">
      <Text className="font-JakartaBold text-4xl text-start text-vogue leading-normal">
        Terms and{"\n"}Conditions
      </Text>

      <Separator orientation="horizontal" className="my-8" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-8">
          <SectionView>
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              1. Introduction
            </H2>
            <P className="text-vogue leading-relaxed">
              Welcome to Don News ("Newz"). The App provides localized news
              focusing on village, street, and community issues. By accessing or
              using the App, you agree to comply with these Terms and
              Conditions. If you do not agree, please refrain from using the
              App.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              2. User Accounts
            </H2>

            <H3 className="my-2 border-b-0 font-JakartaBold text-vogue">
              2.1 Registration
            </H3>
            <H4 className="text-vogue">Users may create an account using:</H4>
            <P className="text-vogue leading-relaxed">
              1. Google Sign-In{"\n"}
              2. Facebook Sign-In{"\n"}
              3. Standard email and password authentication.{"\n"}
            </P>
            <P className="text-vogue leading-relaxed">
              By registering, you confirm that the information provided is
              accurate and that you are at least 18 years of age or have
              parental/guardian consent.
            </P>
          </SectionView>

          <SectionView>
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              2.2 Account Responsibility
            </H2>

            <P className="text-vogue leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities conducted through your
              account. Notify us immediately of any unauthorized use.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              3. Content and Usage
            </H2>

            <H3 className="my-2 border-b-0 font-JakartaBold text-vogue">
              3.1 Local News Content
            </H3>

            <P className="text-vogue leading-relaxed">
              The App provides news and updates related to local communities.
              Content is sourced from various contributors, and while we strive
              for accuracy, we do not guarantee the completeness or reliability
              of any information.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              3.2 User Conduct
            </H2>

            <H4 className="text-vogue">Users must not:</H4>

            <P className="text-vogue leading-relaxed">
              1. Post or share content that is offensive, defamatory, or
              violates any laws.{"\n"}
              2. Misuse the App for fraudulent activities or harm to other
              users.{"\n"}
            </P>
            <P className="text-vogue leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              4. Privacy
            </H2>

            <P className="text-vogue leading-relaxed">
              Your privacy is important to us. Please refer to our [Privacy
              Policy] for details on how we collect, use, and protect your
              personal information.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              5. Third-Party Authentication
            </H2>

            <H3 className="my-2 border-b-0 font-JakartaBold text-vogue">
              5.1 Google and Facebook Sign-In
            </H3>

            <P className="text-vogue leading-relaxed">
              If you use Google or Facebook to log in, you agree to their
              respective terms and conditions. We are not responsible for any
              issues arising from the use of these third-party services.
            </P>

            <H3 className="my-2 border-b-0 font-JakartaBold text-vogue">
              5.2 Data Sharing
            </H3>

            <P className="text-vogue leading-relaxed">
              By using third-party authentication, you consent to share your
              basic profile information (such as name and email) with us to
              create your account.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              6. Intellectual Property
            </H2>

            <P className="text-vogue leading-relaxed">
              All content, logos, and trademarks displayed in the App are the
              property of [Your Company Name] or licensed to us. Unauthorized
              use or reproduction is prohibited.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              7. Limitation of Liability
            </H2>

            <P className="text-vogue leading-relaxed">
              The App and its content are provided "as is" without warranties of
              any kind. We are not liable for any damages resulting from the use
              or inability to use the App.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              8. Modifications to Terms
            </H2>

            <P className="text-vogue leading-relaxed">
              We may update these Terms and Conditions periodically. Continued
              use of the App after changes are posted constitutes your
              acceptance of the revised terms.
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              9. Governing Law
            </H2>

            <P className="text-vogue leading-relaxed">
              These Terms and Conditions are governed by the laws of [Your
              Country/State].
            </P>
          </SectionView>

          <SectionView className="gap-2">
            <H2 className="border-b-0 font-JakartaBold text-vogue">
              10. Contact Us
            </H2>

            <P className="text-vogue leading-relaxed">
              If you have any questions about these Terms and Conditions, please
              contact us at [Your Email Address].
            </P>
          </SectionView>
          <Small>Effective Date: 23/12/2024</Small>
        </View>
      </ScrollView>
    </View>
  );
}
