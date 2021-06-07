import BufferLayout from "buffer-layout";
import {INSTRUCTION_WITHDRAW_STREAM} from "../constants/constants";
import {Connection, PublicKey, SystemProgram, Transaction, TransactionInstruction} from "@solana/web3.js";
import {StreamData} from "../utils/helpers";
import {PROGRAM_ID, STREAMFLOW_ACCOUNT_ID} from "../constants/ids";
import sendTransaction from "./sendTransaction";
import Wallet from "@project-serum/sol-wallet-adapter";

export default async function _withdrawStream(account_id: string, data: StreamData, connection: Connection, wallet: Wallet, network: string) {
    const {receiver} = data;
    const instruction = getWithdrawStreamInstruction(account_id, receiver)
    const tx = new Transaction().add(instruction);
    return await sendTransaction(INSTRUCTION_WITHDRAW_STREAM, tx, connection, wallet, network)
}

function getWithdrawStreamInstruction(account_id, receiver) {

    return new TransactionInstruction({
        keys: [{
            pubkey: new PublicKey(receiver),
            isSigner: true,
            isWritable: true
        }, {
            pubkey: new PublicKey(account_id),
            isSigner: false,
            isWritable: true
        }, {
            //needed to transfer the rent only during the final withdrawal transaction
            pubkey: new PublicKey(STREAMFLOW_ACCOUNT_ID),
            isSigner: false,
            isWritable: true
        }, {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false
        }],
        programId: new PublicKey(PROGRAM_ID),
        data: encodeInstructionData(),
    });

}

function encodeInstructionData() {
    const layout = BufferLayout.struct([
        BufferLayout.u8("instruction"),
        BufferLayout.nu64("amount")
    ]);

    const data = Buffer.alloc(layout.span);
    //TODO - allow withdrawal of arbitrary (allowed) amount
    layout.encode({
            instruction: INSTRUCTION_WITHDRAW_STREAM,
            amount: 0,// 0 = whole available amount is withdrawn.
        },
        data
    );
console.log('buffer', Buffer.toString(data));
    return data;
}
