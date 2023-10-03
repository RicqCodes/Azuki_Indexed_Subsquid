import { DataHandlerContext } from "@subsquid/evm-processor";
import { toJSON } from "@subsquid/util-internal-json";
import { Store } from "../db";
import { EntityBuffer } from "../entityBuffer";
import {
  AzukiEventApproval,
  AzukiEventApprovalForAll,
  AzukiEventOwnershipTransferred,
  AzukiEventTransfer,
  AzukiFunctionAllowlistMint,
  AzukiFunctionApprove,
  AzukiFunctionAuctionMint,
  AzukiFunctionDevMint,
  AzukiFunctionEndAuctionAndSetupNonAuctionSaleInfo,
  AzukiFunctionPublicSaleMint,
  AzukiFunctionRenounceOwnership,
  AzukiFunctionSafeTransferFrom0,
  AzukiFunctionSafeTransferFrom1,
  AzukiFunctionSeedAllowlist,
  AzukiFunctionSetApprovalForAll,
  AzukiFunctionSetAuctionSaleStartTime,
  AzukiFunctionSetBaseUri,
  AzukiFunctionSetOwnersExplicit,
  AzukiFunctionSetPublicSaleKey,
  AzukiFunctionTransferFrom,
  AzukiFunctionTransferOwnership,
  AzukiFunctionWithdrawMoney,
} from "../model";
import * as spec from "../abi/Azuki";
import { Log, Transaction } from "../processor";

const address = "0xed5af388653567af2f388e6224dc7c4b3241c544";

export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
  try {
    switch (log.topics[0]) {
      case spec.events["Approval"].topic: {
        let e = spec.events["Approval"].decode(log);
        EntityBuffer.add(
          new AzukiEventApproval({
            id: log.id,
            blockNumber: log.block.height,
            blockTimestamp: new Date(log.block.timestamp),
            transactionHash: log.transactionHash,
            contract: log.address,
            eventName: "Approval",
            owner: e[0],
            approved: e[1],
            tokenId: e[2],
          })
        );
        break;
      }
      case spec.events["ApprovalForAll"].topic: {
        let e = spec.events["ApprovalForAll"].decode(log);
        EntityBuffer.add(
          new AzukiEventApprovalForAll({
            id: log.id,
            blockNumber: log.block.height,
            blockTimestamp: new Date(log.block.timestamp),
            transactionHash: log.transactionHash,
            contract: log.address,
            eventName: "ApprovalForAll",
            owner: e[0],
            operator: e[1],
            approved: e[2],
          })
        );
        break;
      }
      case spec.events["OwnershipTransferred"].topic: {
        let e = spec.events["OwnershipTransferred"].decode(log);
        EntityBuffer.add(
          new AzukiEventOwnershipTransferred({
            id: log.id,
            blockNumber: log.block.height,
            blockTimestamp: new Date(log.block.timestamp),
            transactionHash: log.transactionHash,
            contract: log.address,
            eventName: "OwnershipTransferred",
            previousOwner: e[0],
            newOwner: e[1],
          })
        );
        break;
      }
      case spec.events["Transfer"].topic: {
        let e = spec.events["Transfer"].decode(log);
        EntityBuffer.add(
          new AzukiEventTransfer({
            id: log.id,
            blockNumber: log.block.height,
            blockTimestamp: new Date(log.block.timestamp),
            transactionHash: log.transactionHash,
            contract: log.address,
            eventName: "Transfer",
            from: e[0],
            to: e[1],
            tokenId: e[2],
          })
        );
        break;
      }
    }
  } catch (error) {
    ctx.log.error(
      {
        error,
        blockNumber: log.block.height,
        blockHash: log.block.hash,
        address,
      },
      `Unable to decode event "${log.topics[0]}"`
    );
  }
}

export function parseFunction(
  ctx: DataHandlerContext<Store>,
  transaction: Transaction
) {
  try {
    switch (transaction.input.slice(0, 10)) {
      case spec.functions["allowlistMint"].sighash: {
        let f = spec.functions["allowlistMint"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionAllowlistMint({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "allowlistMint",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
          })
        );
        break;
      }
      case spec.functions["approve"].sighash: {
        let f = spec.functions["approve"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionApprove({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "approve",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            to: f[0],
            tokenId: f[1],
          })
        );
        break;
      }
      case spec.functions["auctionMint"].sighash: {
        let f = spec.functions["auctionMint"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionAuctionMint({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "auctionMint",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            quantity: f[0],
          })
        );
        break;
      }
      case spec.functions["devMint"].sighash: {
        let f = spec.functions["devMint"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionDevMint({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "devMint",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            quantity: f[0],
          })
        );
        break;
      }
      case spec.functions["endAuctionAndSetupNonAuctionSaleInfo"].sighash: {
        let f = spec.functions["endAuctionAndSetupNonAuctionSaleInfo"].decode(
          transaction.input
        );
        EntityBuffer.add(
          new AzukiFunctionEndAuctionAndSetupNonAuctionSaleInfo({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "endAuctionAndSetupNonAuctionSaleInfo",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            mintlistPriceWei: f[0],
            publicPriceWei: f[1],
            publicSaleStartTime: f[2],
          })
        );
        break;
      }
      case spec.functions["publicSaleMint"].sighash: {
        let f = spec.functions["publicSaleMint"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionPublicSaleMint({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "publicSaleMint",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            quantity: f[0],
            callerPublicSaleKey: f[1],
          })
        );
        break;
      }
      case spec.functions["renounceOwnership"].sighash: {
        let f = spec.functions["renounceOwnership"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionRenounceOwnership({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "renounceOwnership",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
          })
        );
        break;
      }
      case spec.functions["safeTransferFrom(address,address,uint256)"]
        .sighash: {
        let f = spec.functions[
          "safeTransferFrom(address,address,uint256)"
        ].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionSafeTransferFrom0({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "safeTransferFrom(address,address,uint256)",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            from: f[0],
            to: f[1],
            tokenId: f[2],
          })
        );
        break;
      }
      case spec.functions["safeTransferFrom(address,address,uint256,bytes)"]
        .sighash: {
        let f = spec.functions[
          "safeTransferFrom(address,address,uint256,bytes)"
        ].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionSafeTransferFrom1({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "safeTransferFrom(address,address,uint256,bytes)",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            from: f[0],
            to: f[1],
            tokenId: f[2],
            data: f[3],
          })
        );
        break;
      }
      case spec.functions["seedAllowlist"].sighash: {
        let f = spec.functions["seedAllowlist"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionSeedAllowlist({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "seedAllowlist",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            addresses: toJSON(f[0]),
            numSlots: toJSON(f[1]),
          })
        );
        break;
      }
      case spec.functions["setApprovalForAll"].sighash: {
        let f = spec.functions["setApprovalForAll"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionSetApprovalForAll({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "setApprovalForAll",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            operator: f[0],
            approved: f[1],
          })
        );
        break;
      }
      case spec.functions["setAuctionSaleStartTime"].sighash: {
        let f = spec.functions["setAuctionSaleStartTime"].decode(
          transaction.input
        );
        EntityBuffer.add(
          new AzukiFunctionSetAuctionSaleStartTime({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "setAuctionSaleStartTime",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            timestamp: f[0],
          })
        );
        break;
      }
      case spec.functions["setBaseURI"].sighash: {
        let f = spec.functions["setBaseURI"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionSetBaseUri({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "setBaseURI",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            baseUri: f[0],
          })
        );
        break;
      }
      case spec.functions["setOwnersExplicit"].sighash: {
        let f = spec.functions["setOwnersExplicit"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionSetOwnersExplicit({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "setOwnersExplicit",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            quantity: f[0],
          })
        );
        break;
      }
      case spec.functions["setPublicSaleKey"].sighash: {
        let f = spec.functions["setPublicSaleKey"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionSetPublicSaleKey({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "setPublicSaleKey",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            key: f[0],
          })
        );
        break;
      }
      case spec.functions["transferFrom"].sighash: {
        let f = spec.functions["transferFrom"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionTransferFrom({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "transferFrom",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            from: f[0],
            to: f[1],
            tokenId: f[2],
          })
        );
        break;
      }
      case spec.functions["transferOwnership"].sighash: {
        let f = spec.functions["transferOwnership"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionTransferOwnership({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "transferOwnership",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
            newOwner: f[0],
          })
        );
        break;
      }
      case spec.functions["withdrawMoney"].sighash: {
        let f = spec.functions["withdrawMoney"].decode(transaction.input);
        EntityBuffer.add(
          new AzukiFunctionWithdrawMoney({
            id: transaction.id,
            blockNumber: transaction.block.height,
            blockTimestamp: new Date(transaction.block.timestamp),
            transactionHash: transaction.hash,
            contract: transaction.to!,
            functionName: "withdrawMoney",
            functionValue: transaction.value,
            functionSuccess:
              transaction.status != null
                ? Boolean(transaction.status)
                : undefined,
          })
        );
        break;
      }
    }
  } catch (error) {
    ctx.log.error(
      {
        error,
        blockNumber: transaction.block.height,
        blockHash: transaction.block.hash,
        address,
      },
      `Unable to decode function "${transaction.input.slice(0, 10)}"`
    );
  }
}
