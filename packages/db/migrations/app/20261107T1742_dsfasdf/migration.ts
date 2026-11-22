#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1d141d9e599073544a65531ee82cc964860cd1a28732fcc72c1c9246d5fff743/contract';
import startContract from '../../snapshots/1d141d9e599073544a65531ee82cc964860cd1a28732fcc72c1c9246d5fff743/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/71f86f922628ca47bbbf96f0d6637e6dfceda01d36eda1a3ba6afa41aa5241f3/contract';
import endContract from '../../snapshots/71f86f922628ca47bbbf96f0d6637e6dfceda01d36eda1a3ba6afa41aa5241f3/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addRequiredColumnToEmptyTable({
        schema: 'public',
        table: 'Problems',
        column: 'adminId',
        type: 'text',
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
