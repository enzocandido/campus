import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn initialValues={{emailAddress: "@fatec.sp.gov.br"}} />;
}
