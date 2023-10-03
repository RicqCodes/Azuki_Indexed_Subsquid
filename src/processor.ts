import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as azukiAbi from './abi/Azuki'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet', {type: 'EVM'}),
    })
    .setFields({
            log: {
                topics: true,
                data: true,
                transactionHash: true,
            },
            transaction: {
                hash: true,
                input: true,
                from: true,
                value: true,
                status: true,
        }
    })
    .addLog({
        address: ['0xed5af388653567af2f388e6224dc7c4b3241c544'],
        topic0: [
            azukiAbi.events['Approval'].topic,
            azukiAbi.events['ApprovalForAll'].topic,
            azukiAbi.events['OwnershipTransferred'].topic,
            azukiAbi.events['Transfer'].topic,
        ],
        range: {
            from: 13975838,
        },
    })
    .addTransaction({
        to: ['0xed5af388653567af2f388e6224dc7c4b3241c544'],
        sighash: [
            azukiAbi.functions['allowlistMint'].sighash,
            azukiAbi.functions['approve'].sighash,
            azukiAbi.functions['auctionMint'].sighash,
            azukiAbi.functions['devMint'].sighash,
            azukiAbi.functions['endAuctionAndSetupNonAuctionSaleInfo'].sighash,
            azukiAbi.functions['publicSaleMint'].sighash,
            azukiAbi.functions['renounceOwnership'].sighash,
            azukiAbi.functions['safeTransferFrom(address,address,uint256)'].sighash,
            azukiAbi.functions['safeTransferFrom(address,address,uint256,bytes)'].sighash,
            azukiAbi.functions['seedAllowlist'].sighash,
            azukiAbi.functions['setApprovalForAll'].sighash,
            azukiAbi.functions['setAuctionSaleStartTime'].sighash,
            azukiAbi.functions['setBaseURI'].sighash,
            azukiAbi.functions['setOwnersExplicit'].sighash,
            azukiAbi.functions['setPublicSaleKey'].sighash,
            azukiAbi.functions['transferFrom'].sighash,
            azukiAbi.functions['transferOwnership'].sighash,
            azukiAbi.functions['withdrawMoney'].sighash,
        ],
        range: {
            from: 13975838,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
