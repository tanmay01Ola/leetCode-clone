#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/61327c3ebb671324553bb676f3d825255b4a8d319a2e78ddd233dd5ea226042e/contract';
import startContract from '../../snapshots/61327c3ebb671324553bb676f3d825255b4a8d319a2e78ddd233dd5ea226042e/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d49c65ca9350cf7d3fb450f2829401273c034fe240e9121e6b17460cd3711923/contract';
import endContract from '../../snapshots/d49c65ca9350cf7d3fb450f2829401273c034fe240e9121e6b17460cd3711923/contract.json' with { type: 'json' };
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
      this.createTable({
        schema: 'public',
        table: 'ProblemStatus',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('problemId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Problems',
        columns: [
          col('CPUlimit', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('difficultyLevel', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('memoryLimit', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('problemStatement', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Problems_difficultyLevel_check_a1c20f22',
            sql`"difficultyLevel" IN ('easy', 'medium', 'hard')`,
          ),
        ],
      }),
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('role', 'text', {
          notNull: true,
          default: lit('user'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'User',
        constraint: 'User_role_check_5b6d1a59',
        expression: sql`"role" IN ('user', 'admin')`,
      }),
      this.createIndex({
        schema: 'public',
        table: 'ProblemStatus',
        index: 'ProblemStatus_problemId_idx_0024556d',
        columns: ['problemId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ProblemStatus',
        index: 'ProblemStatus_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ProblemStatus',
        foreignKey: {
          name: 'ProblemStatus_problemId_fkey',
          columns: ['problemId'],
          references: { schema: 'public', table: 'Problems', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ProblemStatus',
        foreignKey: {
          name: 'ProblemStatus_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
