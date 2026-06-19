import { expect, test } from "@playwright/test"

test("dashboard premium carrega dados de demonstração", async ({ page }) => {
  await page.goto("/dashboard")
  await expect(page.getByRole("heading", { name: "Visão geral" })).toBeVisible()
  await expect(page.getByText("Organograma Corporativo")).toBeVisible()
  await expect(page.getByText("Onboarding de clientes")).toBeVisible()
})

test("organograma permite criar, editar, salvar e reabrir cargo", async ({ page }) => {
  await page.goto("/orgcharts/org_demo/edit")
  await page.getByRole("button", { name: "Adicionar cargo" }).click()
  await expect(page.getByRole("heading", { name: "Detalhes do cargo" })).toBeVisible()
  await page.getByLabel("Cargo").fill("Gerente de Produto")
  await page.getByLabel("Departamento").fill("Produto")
  await page.getByRole("button", { name: "Salvar" }).click()
  await expect(page.getByText("Organograma salvo.")).toBeVisible()
  await page.reload()
  await expect(page.getByText("Gerente de Produto")).toBeVisible()
})

test("processo permite criar, tipar, salvar e reabrir etapa", async ({ page }) => {
  await page.goto("/processes/process_demo/edit")
  await page.getByRole("button", { name: "Adicionar etapa" }).click()
  await expect(page.getByRole("heading", { name: "Detalhes da etapa" })).toBeVisible()
  await page.getByLabel("Tipo").selectOption("DECISION")
  await page.getByLabel("Nome").fill("Cliente aprovou a proposta?")
  await page.getByRole("button", { name: "Salvar" }).click()
  await expect(page.getByText("Processo salvo.")).toBeVisible()
  await page.reload()
  await expect(page.getByText("Cliente aprovou a proposta?")).toBeVisible()
})

test("organograma exporta PNG", async ({ page }) => {
  await page.goto("/orgcharts/org_demo/edit")
  const downloadPromise = page.waitForEvent("download")
  await page.getByRole("button", { name: "Exportar" }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe("organograma-corporativo.png")
})
