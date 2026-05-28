import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

test("workspace apps exist", () => {
  assert.equal(existsSync("apps/web/package.json"), true);
  assert.equal(existsSync("apps/cms/package.json"), true);
});

test("compose wires the expected services", () => {
  const compose = readFileSync("docker-compose.yml", "utf8");
  assert.match(compose, /services:/);
  assert.match(compose, /web:/);
  assert.match(compose, /cms:/);
  assert.match(compose, /db:/);
});

test("planning artifacts reference phase 1 progression", () => {
  const roadmap = readFileSync(".planning/ROADMAP.md", "utf8");
  assert.match(roadmap, /\[x\] 01-01/);
  assert.match(roadmap, /01-02/);
  assert.match(roadmap, /01-03/);
});
