import { keys } from "@/keys";
import { Img, Section } from "@react-email/components";

const baseUrl = keys().NEXT_PUBLIC_EMAIL_URL;

export function Logo() {
    return (
        <Section className="mt-[32px]">
            <Img
                src={`${baseUrl}/logo.png`}
                width="45"
                height="45"
                alt="Undrstnd Developers"
                className="my-0 mx-auto block"
            />
        </Section>
    );
}