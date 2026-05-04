"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  description?: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
}

export const Modal = ({
  children,
  description,
  isOpen,
  onOpenChange,
  title,
}: ModalProps) => {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-180 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-white shadow-2xl focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#76c900]">
          <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4">
            <div>
              <Dialog.Title className="text-xl font-extrabold leading-tight text-zinc-950">
                {title}
              </Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-1 text-sm text-zinc-600">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close
              aria-label="Fechar modal"
              className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-2xl leading-none text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#76c900]"
              type="button"
            >
              ×
            </Dialog.Close>
          </div>
          <div className="overflow-y-auto px-5 py-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
