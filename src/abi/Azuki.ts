import * as ethers from "ethers";
import { LogEvent, Func, ContractBase } from "./abi.support";
import { ABI_JSON } from "./Azuki.abi";

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
  Approval: new LogEvent<
    [owner: string, approved: string, tokenId: bigint] & {
      owner: string;
      approved: string;
      tokenId: bigint;
    }
  >(abi, "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"),
  ApprovalForAll: new LogEvent<
    [owner: string, operator: string, approved: boolean] & {
      owner: string;
      operator: string;
      approved: boolean;
    }
  >(abi, "0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"),
  OwnershipTransferred: new LogEvent<
    [previousOwner: string, newOwner: string] & {
      previousOwner: string;
      newOwner: string;
    }
  >(abi, "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"),
  Transfer: new LogEvent<
    [from: string, to: string, tokenId: bigint] & {
      from: string;
      to: string;
      tokenId: bigint;
    }
  >(abi, "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"),
};

export const functions = {
  AUCTION_DROP_INTERVAL: new Func<[], {}, bigint>(abi, "0x5cae01d3"),
  AUCTION_DROP_PER_STEP: new Func<[], {}, bigint>(abi, "0x59f369fe"),
  AUCTION_END_PRICE: new Func<[], {}, bigint>(abi, "0xcaf8a6d1"),
  AUCTION_PRICE_CURVE_LENGTH: new Func<[], {}, bigint>(abi, "0xf8a987d8"),
  AUCTION_START_PRICE: new Func<[], {}, bigint>(abi, "0x7a1c4a56"),
  allowlist: new Func<[_: string], {}, bigint>(abi, "0xa7cd52cb"),
  allowlistMint: new Func<[], {}, []>(abi, "0x41fbddbd"),
  amountForAuctionAndDev: new Func<[], {}, bigint>(abi, "0x5666c880"),
  amountForDevs: new Func<[], {}, bigint>(abi, "0xfbe1aa51"),
  approve: new Func<
    [to: string, tokenId: bigint],
    { to: string; tokenId: bigint },
    []
  >(abi, "0x095ea7b3"),
  auctionMint: new Func<[quantity: bigint], { quantity: bigint }, []>(
    abi,
    "0x4d3554c3"
  ),
  balanceOf: new Func<[owner: string], { owner: string }, bigint>(
    abi,
    "0x70a08231"
  ),
  devMint: new Func<[quantity: bigint], { quantity: bigint }, []>(
    abi,
    "0x375a069a"
  ),
  endAuctionAndSetupNonAuctionSaleInfo: new Func<
    [
      mintlistPriceWei: bigint,
      publicPriceWei: bigint,
      publicSaleStartTime: number
    ],
    {
      mintlistPriceWei: bigint;
      publicPriceWei: bigint;
      publicSaleStartTime: number;
    },
    []
  >(abi, "0x16e6e15a"),
  getApproved: new Func<[tokenId: bigint], { tokenId: bigint }, string>(
    abi,
    "0x081812fc"
  ),
  getAuctionPrice: new Func<
    [_saleStartTime: bigint],
    { _saleStartTime: bigint },
    bigint
  >(abi, "0x917d009e"),
  getOwnershipData: new Func<
    [tokenId: bigint],
    { tokenId: bigint },
    [addr: string, startTimestamp: bigint] & {
      addr: string;
      startTimestamp: bigint;
    }
  >(abi, "0x9231ab2a"),
  isApprovedForAll: new Func<
    [owner: string, operator: string],
    { owner: string; operator: string },
    boolean
  >(abi, "0xe985e9c5"),
  isPublicSaleOn: new Func<
    [
      publicPriceWei: bigint,
      publicSaleKey: bigint,
      publicSaleStartTime: bigint
    ],
    {
      publicPriceWei: bigint;
      publicSaleKey: bigint;
      publicSaleStartTime: bigint;
    },
    boolean
  >(abi, "0x422030ba"),
  maxPerAddressDuringMint: new Func<[], {}, bigint>(abi, "0x8bc35c2f"),
  name: new Func<[], {}, string>(abi, "0x06fdde03"),
  nextOwnerToExplicitlySet: new Func<[], {}, bigint>(abi, "0xd7224ba0"),
  numberMinted: new Func<[owner: string], { owner: string }, bigint>(
    abi,
    "0xdc33e681"
  ),
  owner: new Func<[], {}, string>(abi, "0x8da5cb5b"),
  ownerOf: new Func<[tokenId: bigint], { tokenId: bigint }, string>(
    abi,
    "0x6352211e"
  ),
  publicSaleMint: new Func<
    [quantity: bigint, callerPublicSaleKey: bigint],
    { quantity: bigint; callerPublicSaleKey: bigint },
    []
  >(abi, "0xcb91d8b3"),
  renounceOwnership: new Func<[], {}, []>(abi, "0x715018a6"),
  "safeTransferFrom(address,address,uint256)": new Func<
    [from: string, to: string, tokenId: bigint],
    { from: string; to: string; tokenId: bigint },
    []
  >(abi, "0x42842e0e"),
  "safeTransferFrom(address,address,uint256,bytes)": new Func<
    [from: string, to: string, tokenId: bigint, _data: string],
    { from: string; to: string; tokenId: bigint; _data: string },
    []
  >(abi, "0xb88d4fde"),
  saleConfig: new Func<
    [],
    {},
    [
      auctionSaleStartTime: number,
      publicSaleStartTime: number,
      mintlistPrice: bigint,
      publicPrice: bigint,
      publicSaleKey: number
    ] & {
      auctionSaleStartTime: number;
      publicSaleStartTime: number;
      mintlistPrice: bigint;
      publicPrice: bigint;
      publicSaleKey: number;
    }
  >(abi, "0x90aa0b0f"),
  seedAllowlist: new Func<
    [addresses: Array<string>, numSlots: Array<bigint>],
    { addresses: Array<string>; numSlots: Array<bigint> },
    []
  >(abi, "0xb05863d5"),
  setApprovalForAll: new Func<
    [operator: string, approved: boolean],
    { operator: string; approved: boolean },
    []
  >(abi, "0xa22cb465"),
  setAuctionSaleStartTime: new Func<
    [timestamp: number],
    { timestamp: number },
    []
  >(abi, "0x6ebc5601"),
  setBaseURI: new Func<[baseURI: string], { baseURI: string }, []>(
    abi,
    "0x55f804b3"
  ),
  setOwnersExplicit: new Func<[quantity: bigint], { quantity: bigint }, []>(
    abi,
    "0x2d20fb60"
  ),
  setPublicSaleKey: new Func<[key: number], { key: number }, []>(
    abi,
    "0x90028083"
  ),
  supportsInterface: new Func<
    [interfaceId: string],
    { interfaceId: string },
    boolean
  >(abi, "0x01ffc9a7"),
  symbol: new Func<[], {}, string>(abi, "0x95d89b41"),
  tokenByIndex: new Func<[index: bigint], { index: bigint }, bigint>(
    abi,
    "0x4f6ccce7"
  ),
  tokenOfOwnerByIndex: new Func<
    [owner: string, index: bigint],
    { owner: string; index: bigint },
    bigint
  >(abi, "0x2f745c59"),
  tokenURI: new Func<[tokenId: bigint], { tokenId: bigint }, string>(
    abi,
    "0xc87b56dd"
  ),
  totalSupply: new Func<[], {}, bigint>(abi, "0x18160ddd"),
  transferFrom: new Func<
    [from: string, to: string, tokenId: bigint],
    { from: string; to: string; tokenId: bigint },
    []
  >(abi, "0x23b872dd"),
  transferOwnership: new Func<[newOwner: string], { newOwner: string }, []>(
    abi,
    "0xf2fde38b"
  ),
  withdrawMoney: new Func<[], {}, []>(abi, "0xac446002"),
};

export class Contract extends ContractBase {
  AUCTION_DROP_INTERVAL(): Promise<bigint> {
    return this.eth_call(functions.AUCTION_DROP_INTERVAL, []);
  }

  AUCTION_DROP_PER_STEP(): Promise<bigint> {
    return this.eth_call(functions.AUCTION_DROP_PER_STEP, []);
  }

  AUCTION_END_PRICE(): Promise<bigint> {
    return this.eth_call(functions.AUCTION_END_PRICE, []);
  }

  AUCTION_PRICE_CURVE_LENGTH(): Promise<bigint> {
    return this.eth_call(functions.AUCTION_PRICE_CURVE_LENGTH, []);
  }

  AUCTION_START_PRICE(): Promise<bigint> {
    return this.eth_call(functions.AUCTION_START_PRICE, []);
  }

  allowlist(arg0: string): Promise<bigint> {
    return this.eth_call(functions.allowlist, [arg0]);
  }

  amountForAuctionAndDev(): Promise<bigint> {
    return this.eth_call(functions.amountForAuctionAndDev, []);
  }

  amountForDevs(): Promise<bigint> {
    return this.eth_call(functions.amountForDevs, []);
  }

  balanceOf(owner: string): Promise<bigint> {
    return this.eth_call(functions.balanceOf, [owner]);
  }

  getApproved(tokenId: bigint): Promise<string> {
    return this.eth_call(functions.getApproved, [tokenId]);
  }

  getAuctionPrice(_saleStartTime: bigint): Promise<bigint> {
    return this.eth_call(functions.getAuctionPrice, [_saleStartTime]);
  }

  getOwnershipData(
    tokenId: bigint
  ): Promise<
    [addr: string, startTimestamp: bigint] & {
      addr: string;
      startTimestamp: bigint;
    }
  > {
    return this.eth_call(functions.getOwnershipData, [tokenId]);
  }

  isApprovedForAll(owner: string, operator: string): Promise<boolean> {
    return this.eth_call(functions.isApprovedForAll, [owner, operator]);
  }

  isPublicSaleOn(
    publicPriceWei: bigint,
    publicSaleKey: bigint,
    publicSaleStartTime: bigint
  ): Promise<boolean> {
    return this.eth_call(functions.isPublicSaleOn, [
      publicPriceWei,
      publicSaleKey,
      publicSaleStartTime,
    ]);
  }

  maxPerAddressDuringMint(): Promise<bigint> {
    return this.eth_call(functions.maxPerAddressDuringMint, []);
  }

  name(): Promise<string> {
    return this.eth_call(functions.name, []);
  }

  nextOwnerToExplicitlySet(): Promise<bigint> {
    return this.eth_call(functions.nextOwnerToExplicitlySet, []);
  }

  numberMinted(owner: string): Promise<bigint> {
    return this.eth_call(functions.numberMinted, [owner]);
  }

  owner(): Promise<string> {
    return this.eth_call(functions.owner, []);
  }

  ownerOf(tokenId: bigint): Promise<string> {
    return this.eth_call(functions.ownerOf, [tokenId]);
  }

  saleConfig(): Promise<
    [
      auctionSaleStartTime: number,
      publicSaleStartTime: number,
      mintlistPrice: bigint,
      publicPrice: bigint,
      publicSaleKey: number
    ] & {
      auctionSaleStartTime: number;
      publicSaleStartTime: number;
      mintlistPrice: bigint;
      publicPrice: bigint;
      publicSaleKey: number;
    }
  > {
    return this.eth_call(functions.saleConfig, []);
  }

  supportsInterface(interfaceId: string): Promise<boolean> {
    return this.eth_call(functions.supportsInterface, [interfaceId]);
  }

  symbol(): Promise<string> {
    return this.eth_call(functions.symbol, []);
  }

  tokenByIndex(index: bigint): Promise<bigint> {
    return this.eth_call(functions.tokenByIndex, [index]);
  }

  tokenOfOwnerByIndex(owner: string, index: bigint): Promise<bigint> {
    return this.eth_call(functions.tokenOfOwnerByIndex, [owner, index]);
  }

  tokenURI(tokenId: bigint): Promise<string> {
    return this.eth_call(functions.tokenURI, [tokenId]);
  }

  totalSupply(): Promise<bigint> {
    return this.eth_call(functions.totalSupply, []);
  }
}
