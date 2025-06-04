import {
  BlockchainIdType,
  BlockchainNameType,
  BlockchainNetworkIdType,
  BlockchainType,
  CallDataType,
  InputType,
  PaymentType,
  TransactionType,
} from "./types";

import PROTOCOL_ADDRESSES from "./addresses";
export { PROTOCOL_ADDRESSES };

export type { BlockchainNameType };
export type { BlockchainNetworkIdType };
export type { BlockchainIdType };
export type { BlockchainType };
export type { CallDataType };
export type { TransactionType };

const verifyAddress = (
  blockchain: BlockchainType,
  address: string
) : boolean => {
  return PROTOCOL_ADDRESSES[blockchain] === address;
}

function splitHexData(data: string, start: number, length: number): string {
  return data.substring(start, start + length);
}

function parseUint256(data: string): bigint {
  return BigInt(`0x${data}`);  // Prefix with '0x' to ensure it's treated as a hex value
}

function parseAddress(data: string): string {
  return "0x" + data.substring(24);
}

function parseBool(data: string): boolean {
  return data !== "0".repeat(64);
}

function parseUint8(data: string): number {
  return parseInt(data, 16);
}

function parseBytes(data: string, index: number): string {
  const lengthHex = splitHexData(data, index, 64);
  const length = parseUint256(lengthHex);
  const bytesStart = index + 64;
  const bytesEnd = bytesStart + (Number(length) * 2);
  return splitHexData(data, bytesStart, Number(length) * 2);
}

export function decodePayment({
  blockchain,
  address,
  transaction
} : InputType) : PaymentType | undefined {
  if(!verifyAddress(blockchain, address)) { return }

  if(typeof transaction === 'string' && transaction.match('0x')) { // EVM

    const method = transaction.substring(2, 10);

    if(method === 'cac7130c') { // pay(tuple payment)
      return {
        amount: parseUint256(splitHexData(transaction, 74, 64)),
        token: parseAddress(splitHexData(transaction, 458, 64)),
        receiver: parseAddress(splitHexData(transaction, 650, 64)),
      };
    } else if(method === '64f0acc4') { // pay(tuple payment,tuple permitTransferFromAndSignature)
      return {
        amount: parseUint256(splitHexData(transaction, 138, 64)),
        token: parseAddress(splitHexData(transaction, 522, 64)),
        receiver: parseAddress(splitHexData(transaction, 714, 64)),
      };
    }
    
  } else if (blockchain === 'solana') {
    
  }

  return
}
