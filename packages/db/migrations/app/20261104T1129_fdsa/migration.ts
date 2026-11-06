#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/367f8f9df74ce9a66dfc403e2a847a90941ca453327c9b6fe64c78384372e700/contract';
import startContract from '../../snapshots/367f8f9df74ce9a66dfc403e2a847a90941ca453327c9b6fe64c78384372e700/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/aa27abfc9cf6de9141c8a3c0c6e97c04dc8cade3ec7514e39db8212c423a2e62/contract';
import endContract from '../../snapshots/aa27abfc9cf6de9141c8a3c0c6e97c04dc8cade3ec7514e39db8212c423a2e62/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'ProblemStatus',
        constraint: 'ProblemStatus_problemId_fkey',
        kind: 'foreignKey',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'ProblemStatus',
        constraint: 'ProblemStatus_userId_fkey',
        kind: 'foreignKey',
      }),
      this.dropIndex({
        schema: 'public',
        table: 'ProblemStatus',
        index: 'ProblemStatus_userId_idx_a489d58a',
      }),
      this.dropColumn({ schema: 'public', table: 'ProblemStatus', column: 'userId' }),
      this.dropTable({ schema: 'public', table: 'Problems' }),
      this.createTable({
        schema: 'public',
        table: 'Problem',
        columns: [
          col('CPUlimit', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('difficultyLevel', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('memoryLimit', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('problemStatement', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('submit', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('submitId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Problem_difficultyLevel_check_a1c20f22',
            sql`"difficultyLevel" IN ('easy', 'medium', 'hard')`,
          ),
        ],
      }),
      this.addColumn({
        schema: 'public',
        table: 'ProblemStatus',
        column: col('status', 'text', {
          notNull: true,
          default: lit('not_attempted'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'ProblemStatus',
        column: 'code',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'ProblemStatus',
        column: 'language',
        type: 'text',
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'ProblemStatus',
        constraint: 'ProblemStatus_language_check_032d133c',
        expression: sql`"language" IN ('javascript', 'typescript', 'go', 'rust', 'python', 'ccc')`,
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'ProblemStatus',
        constraint: 'ProblemStatus_status_check_6e9e3569',
        expression: sql`"status" IN ('not_attempted', 'submitted', 'accepted')`,
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ProblemStatus',
        foreignKey: {
          name: 'ProblemStatus_problemId_fkey',
          columns: ['problemId'],
          references: { schema: 'public', table: 'Problem', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
