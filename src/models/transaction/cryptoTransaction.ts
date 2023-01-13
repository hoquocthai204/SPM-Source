export interface CryptoTransaction {
    transactionHash: string;
    networkSN: string,
    amount: number, 
    toAddress: string,
    status: string,
    systemConfirmedDate: Date,
    type: string,
    currencySN: string,
    createdDate: Date,
    id: number,
}