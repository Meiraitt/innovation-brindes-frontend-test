import { expect, test } from "@playwright/test";
import { formatCurrentDate } from "../src/utils/formatCurrentDate";

const mockedProducts = [
  {
    categoryCode: "1015137",
    code: "3419",
    description: "Copo plastico 700ml",
    imageUrl: "",
    name: "COPO PLASTICO 700ML",
    price: "4.5999999999999996",
    reference: "10151373419",
  },
  {
    categoryCode: "1016061",
    code: "3506",
    description: "Bloco de anotacoes com elastico",
    imageUrl: "",
    name: "BLOCO DE ANOTACOES ELASTICO",
    price: "49.62",
    reference: "10160613506",
  },
];

test("login redirects to products grid", async ({ page }) => {
  const userName = "DINAMICA";
  const today = formatCurrentDate();

  await page.route("**/api/auth/login", async (route) => {
    await route.fulfill({
      body: JSON.stringify({
        message: "Sucesso.",
        status: 1,
        user: {
          groupId: "0",
          groupName: "ADMIN",
          id: "30",
          name: userName,
        },
      }),
      contentType: "application/json",
      headers: {
        "set-cookie":
          "innovation_auth_token=e2e-token; Path=/; SameSite=Lax",
      },
      status: 200,
    });
  });

  await page.route("**/api/products", async (route) => {
    await route.fulfill({
      body: JSON.stringify(mockedProducts),
      contentType: "application/json",
      status: 200,
    });
  });

  await page.goto("/login");
  await page.getByLabel("Usuário").fill("dinamica");
  await page.getByLabel("Senha").fill("123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/produtos$/);
  await expect(page.getByText(userName)).toBeVisible();
  await expect(page.getByText(today)).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "COPO PLASTICO 700ML" }),
  ).toBeVisible();
  await expect(page.getByText("3419")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "CONFIRA" }).first(),
  ).toBeVisible();
});
