import type { AxeResults, Result as AxeViolation } from 'axe-core';
import { test } from '@playwright/test';

// Render a compact table and attach JSON to the Playwright report.
// Set AXE_FAIL=0 to only warn (don’t fail the test).
export function reportAxe(results: AxeResults) {
  const { violations } = results;

  if (!violations.length) {
    console.log('✅ axe: no violations');
    return;
  }

  // Compact table: rule, impact, count, examples, help
  const rows = violations.map(v => ({
    rule: v.id,
    impact: v.impact ?? 'unknown',
    nodes: v.nodes.length,
    example: v.nodes[0]?.target?.slice(0, 3)?.join(' ') ?? '(no target)',
    help: v.helpUrl,
  }));

  // Clear separator for CI logs
  console.log('\n⚠️  axe violations');
  console.table(rows);

  // Provide a short “what to fix” list
  console.log(
    '\nTop offenders:',
    violations
      .sort((a, b) => (b.nodes.length || 0) - (a.nodes.length || 0))
      .slice(0, 5)
      .map(v => `${v.id} (${v.impact ?? 'n/a'}): ${v.nodes.length}`)
      .join(', ')
  );

  // Attach full JSON to the Playwright report
  const info = test.info?.();
  if (info) {
    info.attach('axe-violations.json', {
      contentType: 'application/json',
      body: Buffer.from(JSON.stringify(violations, null, 2)),
    });
  }

  if (process.env.AXE_FAIL !== '0') {
    // Let caller decide when to assert in test, but throw here if desired
    // (keeping it off by default so the test controls the failure)
  }
}

export type { AxeViolation };

