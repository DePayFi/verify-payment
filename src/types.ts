export type BlockchainNameType = 
  'arbitrum'|
  'avalanche'|
  'base'|
  'bsc'|
  'ethereum'|
  'gnosis'|
  'optimism'|
  'polygon'|
  'worldchain'|
  'solana'
;

export type BlockchainNetworkIdType = 
  '42161'|  // arbitrum
  '43114'|  // avalanche
  '8453'|   // base
  '56'|     // bsc
  '1'|      // ethereum
  '100'|    // gnosis
  '10'|     // optimism
  '137'|    // polygon
  '480'|    // worldchain
  'solana'  // solana
;

export type BlockchainIdType = 
  '0xa4b1'|   // arbitrum
  '0xa86a'|   // avalanche
  '0x2105'|   // base
  '0x38'|     // bsc
  '0x1'|      // ethereum
  '0x64'|     // gnosis
  '0xa'|      // optimism
  '0x89'|     // polygon
  '0x1e0'|     // worldchain
  'solana'    // solana
;

export type PaymentType = {
  amount: bigint;
  token: string;
  receiver: string;
}

export type BlockchainType = BlockchainNameType | BlockchainNetworkIdType | BlockchainIdType;

export type CallDataType = string;

export type TransactionType = CallDataType;

export type InputType = {
  blockchain: BlockchainType;
  address: string;
  transaction: TransactionType;
}
