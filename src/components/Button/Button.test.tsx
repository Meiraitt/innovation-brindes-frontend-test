import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("calls onClick when enabled", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Entrar</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("disables the button while loading", () => {
    render(<Button isLoading>Salvar</Button>);

    expect(screen.getByRole("button", { name: "Salvar" })).toBeDisabled();
  });
});
