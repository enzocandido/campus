import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp initialValues={{emailAddress: "@fatec.sp.gov.br"}} />;
}
