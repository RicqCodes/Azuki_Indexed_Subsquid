import { azuki } from "./mapping";
import { processor } from "./processor";
import { db, Store } from "./db";
import { EntityBuffer } from "./entityBuffer";
import { Block, Transaction } from "./model";

processor.run(db, async (ctx) => {
  for (let block of ctx.blocks) {
    EntityBuffer.add(
      new Block({
        id: block.header.id,
        number: block.header.height,
        timestamp: new Date(block.header.timestamp),
      })
    );

    for (let log of block.logs) {
      if (log.address === "0xed5af388653567af2f388e6224dc7c4b3241c544") {
        azuki.parseEvent(ctx, log);
      }
    }

    for (let transaction of block.transactions) {
      if (transaction.to === "0xed5af388653567af2f388e6224dc7c4b3241c544") {
        azuki.parseFunction(ctx, transaction);
      }

      EntityBuffer.add(
        new Transaction({
          id: transaction.id,
          blockNumber: block.header.height,
          blockTimestamp: new Date(block.header.timestamp),
          hash: transaction.hash,
          to: transaction.to,
          from: transaction.from,
          status: transaction.status,
        })
      );
    }
  }

  for (let entities of EntityBuffer.flush()) {
    await ctx.store.insert(entities);
  }
});
