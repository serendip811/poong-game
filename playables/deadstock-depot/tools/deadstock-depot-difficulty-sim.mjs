#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const GAME_FILE = path.join(ROOT_DIR, "game.js");

const currentConfig = extractDayConfig(fs.readFileSync(GAME_FILE, "utf8"));
const difficultyRows = Object.entries(currentConfig).map(([day, config]) => ({
  day: Number(day),
  ...config,
  difficulty: calculateDifficultyIndex(config),
}));

const normalizedRows = difficultyRows.map((row) => ({
  ...row,
  relativeToDay1: row.difficulty / difficultyRows[0].difficulty,
}));

console.log("# Deadstock Depot difficulty helper");
console.log("");
console.log("Current days:");
printTable(
  Object.entries(currentConfig).map(([day, config]) => ({
    day: Number(day),
    ...config,
    difficulty: calculateDifficultyIndex(config),
  }))
);

console.log("");
console.log("Current late-game curve:");
printTable(normalizedRows.filter((row) => row.day >= 4));

console.log("");
console.log("Late-game curve:");
for (const row of normalizedRows.filter((entry) => entry.day >= 4)) {
  console.log(
    `Day ${row.day}: difficulty ${row.difficulty.toFixed(2)} (${row.relativeToDay1.toFixed(2)}x day 1)`
  );
}

function extractDayConfig(source) {
  const match = source.match(/const DAY_CONFIG = \{([\s\S]*?)\n\};/);
  if (!match) {
    throw new Error("Unable to find DAY_CONFIG in game.js");
  }

  return new Function(`return ({${match[1]}\n});`)();
}

function calculateDifficultyIndex(config) {
  const saleLoad = 40 / config.saleDuration;
  const patienceLoad = 7.4 / config.customerPatience;
  const stockLoad = 20 / config.stockDuration;
  const nightLoad = config.nightQuota / 6;
  const speedLoad = config.nightSpeed / 0.12;
  const runnerLoad = config.runnerChance / 0.12;
  const spawnLoad = 1.45 / config.spawnInterval;
  const defenseLoad = 30 / config.defenseDuration;

  return (
    saleLoad * 0.22 +
    patienceLoad * 0.2 +
    stockLoad * 0.08 +
    nightLoad * 0.24 +
    speedLoad * 0.1 +
    runnerLoad * 0.08 +
    spawnLoad * 0.05 +
    defenseLoad * 0.03
  );
}

function printTable(rows) {
  const headers = ["Day", "Sale", "Def", "Patience", "Quota", "Speed", "Runner", "Spawn", "Score"];
  const formatted = rows.map((row) => [
    String(row.day),
    String(row.saleDuration),
    String(row.defenseDuration),
    row.customerPatience.toFixed(1),
    String(row.nightQuota),
    row.nightSpeed.toFixed(2),
    row.runnerChance.toFixed(2),
    row.spawnInterval.toFixed(2),
    row.difficulty.toFixed(2),
  ]);

  const widths = headers.map((header, index) =>
    Math.max(header.length, ...formatted.map((cells) => cells[index].length))
  );

  console.log(
    headers
      .map((header, index) => header.padEnd(widths[index]))
      .join("  ")
  );
  console.log(
    widths
      .map((width) => "-".repeat(width))
      .join("  ")
  );

  for (const cells of formatted) {
    console.log(
      cells
        .map((cell, index) => cell.padEnd(widths[index]))
        .join("  ")
    );
  }
}
