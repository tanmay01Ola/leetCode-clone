#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/7fd1e5740f139724cc16ae8c35247ec2d10b1eca471c5784faa6cd7d4d3bd8fa/contract';
import startContract from '../../snapshots/7fd1e5740f139724cc16ae8c35247ec2d10b1eca471c5784faa6cd7d4d3bd8fa/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/c6c420b7696fb44a725c7e5ebba9624e38954b37e2fe593f8ffc8124d02b0ebc/contract';
import endContract from '../../snapshots/c6c420b7696fb44a725c7e5ebba9624e38954b37e2fe593f8ffc8124d02b0ebc/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'ProblemStatus',
        column: 'userId',
        type: 'text',
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
          name: 'ProblemStatus_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
