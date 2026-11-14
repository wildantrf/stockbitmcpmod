import { test } from "node:test";
import assert from "node:assert/strict";
import { packEntry } from "./check-pack.mjs";

const entry = { name: "stockbit-mcp", version: "1.4.1", files: [{ path: "package.json" }] };

test("package check accepts npm 12 keyed output and older output shapes", () => {
  for (const value of [{ "stockbit-mcp": entry }, [entry], entry]) {
    assert.equal(packEntry(value), entry);
  }
});

test("package check refuses missing or ambiguous package results", () => {
  for (const value of [null, {}, [], { error: "failed" }, [entry, entry], { one: entry, two: entry }]) {
    assert.throws(() => packEntry(value), /exactly one package file list/);
  }
});
