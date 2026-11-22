#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/367f8f9df74ce9a66dfc403e2a847a90941ca453327c9b6fe64c78384372e700/contract';
import startContract from '../../snapshots/367f8f9df74ce9a66dfc403e2a847a90941ca453327c9b6fe64c78384372e700/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d0c5b9105b92535d26649a2a9abdd3a58f47d1855edf9573c1462b19c5e04edb/contract';
import endContract from '../../snapshots/d0c5b9105b92535d26649a2a9abdd3a58f47d1855edf9573c1462b19c5e04edb/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'ProblemStatus',
        column: col('status', 'text', {
          notNull: true,
          default: lit('not_attempted'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Problems',
        column: col('submitId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
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
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Problems',
        column: 'adminId',
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
      this.addUnique({
        schema: 'public',
        table: 'Problems',
        constraint: 'Problems_problemStatement_adminId_key',
        columns: ['problemStatement', 'adminId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Problems',
        index: 'Problems_adminId_idx_530179db',
        columns: ['adminId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Problems',
        foreignKey: {
          name: 'Problems_adminId_fkey',
          columns: ['adminId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
