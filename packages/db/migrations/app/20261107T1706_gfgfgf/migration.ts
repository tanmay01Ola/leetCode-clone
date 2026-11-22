#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1d141d9e599073544a65531ee82cc964860cd1a28732fcc72c1c9246d5fff743/contract';
import startContract from '../../snapshots/1d141d9e599073544a65531ee82cc964860cd1a28732fcc72c1c9246d5fff743/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d0c5b9105b92535d26649a2a9abdd3a58f47d1855edf9573c1462b19c5e04edb/contract';
import endContract from '../../snapshots/d0c5b9105b92535d26649a2a9abdd3a58f47d1855edf9573c1462b19c5e04edb/contract.json' with { type: 'json' };
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
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Problems',
        column: 'adminId',
        type: 'text',
      }),
      this.addUnique({
        schema: 'public',
        table: 'Problems',
        constraint: 'Problems_problemStatement_adminId_key',
        columns: ['problemStatement', 'adminId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ProblemStatus',
        index: 'ProblemStatus_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Problems',
        index: 'Problems_adminId_idx_530179db',
        columns: ['adminId'],
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
