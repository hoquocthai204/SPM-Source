export interface FiatTransaction {
    id: number,
    createdDate: Date,
    type: string,
    amount: number, 
    chargedFee: number,
    accountNumber: string,
    status: string,
}