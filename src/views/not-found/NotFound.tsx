import { ButtonLink } from "@/components";

export const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
      <section className="w-full max-w-150 rounded-lg border border-zinc-200 bg-white px-6 py-10 text-center shadow-xl sm:px-12">
        <p className="text-4xl font-extrabold uppercase tracking-[0.2em] text-[#76c900]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-zinc-950 sm:text-4xl">
          Pagina nao encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-100 text-base leading-7 text-zinc-600">
          O endereco acessado nao existe ou foi movido.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink className="h-12 px-6" href="/login">
            Ir para login
          </ButtonLink>
          <ButtonLink
            className="h-12 px-6"
            href="/produtos"
            variant="secondary"
          >
            Ver produtos
          </ButtonLink>
        </div>
      </section>
    </main>
  );
};
