import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("links label and input", () => {
    render(<Input label="Usuario" name="user" />);

    expect(screen.getByLabelText("Usuario")).toBeInTheDocument();
  });

  it("shows accessible error state", () => {
    render(<Input error="Informe seu usuario." label="Usuario" name="user" />);

    expect(screen.getByLabelText("Usuario")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Informe seu usuario.",
    );
  });
});
