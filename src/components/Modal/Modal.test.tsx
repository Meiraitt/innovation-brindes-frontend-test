import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("shows title, description and content when open", () => {
    render(
      <Modal
        description="Codigo 3419"
        isOpen
        onOpenChange={vi.fn()}
        title="COPO PLASTICO 700ML"
      >
        <p>Detalhes do produto</p>
      </Modal>,
    );

    expect(
      screen.getByRole("dialog", { name: "COPO PLASTICO 700ML" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Codigo 3419")).toBeInTheDocument();
    expect(screen.getByText("Detalhes do produto")).toBeInTheDocument();
  });

  it("calls onOpenChange when close button is clicked", () => {
    const handleOpenChange = vi.fn();

    render(
      <Modal isOpen onOpenChange={handleOpenChange} title="Produto">
        <p>Conteudo</p>
      </Modal>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Fechar modal" }));

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
