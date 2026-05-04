import Image from "next/image";
import loginBackground from "@/assets/images/login-background.webp";
import { LoginForm } from "./components/LoginForm";

export const Login = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-100 px-5 py-10">
      <Image
        alt="background image"
        aria-hidden="true"
        className="absolute inset-0 object-cover object-right"
        fill
        priority
        sizes="100vw"
        src={loginBackground}
      />
      <section className="relative z-10 flex w-full flex-col items-center gap-10">
        <h1 className="text-center text-3xl font-bold text-[#76c900] sm:text-3xl md:text-[2.5rem]">
          Bem-vindo a Innovation Brindes
        </h1>
        <LoginForm />
      </section>
    </main>
  );
};
