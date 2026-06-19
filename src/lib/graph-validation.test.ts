import { describe, expect, it } from "vitest"
import { validateOrgConnection, validateProcessConnection, wouldCreateOrgCycle } from "@/lib/graph-validation"

describe("organogram connection rules", () => {
  const edges = [
    { id: "1", source: "a", target: "b" },
    { id: "2", source: "b", target: "c" },
  ]

  it("detects hierarchy cycles", () => {
    expect(wouldCreateOrgCycle(edges, "c", "a")).toBe(true)
  })

  it("allows a new branch", () => {
    expect(validateOrgConnection(edges, "a", "d")).toBeNull()
  })

  it("allows only one direct superior", () => {
    expect(validateOrgConnection(edges, "d", "c")).toContain("apenas um superior")
  })
})

describe("process connection rules", () => {
  it("allows loops but blocks self loops", () => {
    const edges = [{ id: "1", source: "a", target: "b" }]
    expect(validateProcessConnection(edges, "b", "a")).toBeNull()
    expect(validateProcessConnection(edges, "a", "a")).toContain("si mesma")
  })
})
