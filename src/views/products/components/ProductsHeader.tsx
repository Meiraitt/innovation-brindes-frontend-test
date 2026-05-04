"use client";

import innovationLogoImage from "@/assets/images/innovation-logo-horizontal.png";
import placeholderImage from "@/assets/images/placeholder.png";
import { MailIcon, PhoneIcon } from "@/assets/icons";
import { useAuthStore } from "@/stores/authStore";
import { formatCurrentDate } from "@/utils/formatCurrentDate";
import Image from "next/image";
import type { ReactNode } from "react";

const notificationCount = 11;

type NotificationButtonProps = {
  badgeRightClassName: string;
  children: ReactNode;
  count: number;
  label: string;
};

const NotificationButton = ({
  badgeRightClassName,
  children,
  count,
  label,
}: NotificationButtonProps) => {
  return (
    <button
      aria-label={`${label}: ${count} notificacoes`}
      className="relative flex size-10 cursor-pointer items-center justify-center text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
      type="button"
    >
      {children}
      <span
        className={`absolute -top-1 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#76c900] ${badgeRightClassName}`}
      >
        {count}
      </span>
    </button>
  );
};

export const ProductsHeader = () => {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const userName = useAuthStore((state) => state.userName);
  const displayedUserName = userName ?? "Ana Carol Machado";
  const today = formatCurrentDate();

  return (
    <header className="bg-[#76c900] text-white">
      <div className="mx-auto flex min-h-30 w-full max-w-360 flex-col items-center justify-between gap-5 px-5 py-5 min-[920px]:flex-row min-[920px]:gap-6 min-[920px]:px-6 lg:px-10">
        <Image
          alt="Innovation Brindes"
          className="h-18 w-auto object-contain sm:h-20 min-[920px]:h-25"
          height={120}
          priority
          src={innovationLogoImage}
          width={304}
        />

        <div className="flex w-full flex-col-reverse items-center gap-4 min-[920px]:w-auto min-[920px]:flex-row min-[920px]:justify-end min-[920px]:gap-5">
          <div className="flex items-center gap-5">
            <NotificationButton
              badgeRightClassName="-right-4"
              label="Mensagens"
              count={notificationCount}
            >
              <MailIcon />
            </NotificationButton>
            <NotificationButton
              badgeRightClassName="-right-2"
              label="Chamadas"
              count={notificationCount}
            >
              <PhoneIcon />
            </NotificationButton>
          </div>

          <div className="flex items-center justify-center gap-2 min-[920px]:justify-start min-[920px]:gap-3">
            <div className="rounded-full bg-white p-1.5 shadow-sm">
              <Image
                alt={`Foto de perfil de ${displayedUserName}`}
                className="size-11 rounded-full object-cover min-[920px]:size-16"
                height={72}
                src={placeholderImage}
                width={72}
              />
            </div>
            <div className="leading-tight">
              <p className="text-center text-[1.125rem] font-light min-[920px]:text-left min-[920px]:text-3xl">
                {hasHydrated ? (
                  displayedUserName
                ) : (
                  <span className="inline-block h-5 w-20 animate-pulse rounded bg-white/40 min-[920px]:h-8 min-[920px]:w-40" />
                )}
              </p>
              <p className="text-center text-xs font-extrabold min-[920px]:text-left min-[920px]:text-xl">
                {today}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
