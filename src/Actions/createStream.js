import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionInstruction
} from "@solana/web3.js";
import {PROGRAM_ID} from "../constants/ids";
import BufferLayout from "buffer-layout";
import {INSTRUCTION_CREATE_STREAM} from "../constants/constants";
import {StreamData} from "../utils/helpers";
import sendTransaction from "./sendTransaction";
import Wallet from "@project-serum/sol-wallet-adapter";

export default async function _createStream(data: StreamData, connection: Connection, wallet: Wallet, network?: string, pda: Keypair) {
    const instruction = getCreateStreamInstruction(data, pda.publicKey)
    const tx = new Transaction().add(instruction);
    return await sendTransaction(INSTRUCTION_CREATE_STREAM, tx, connection, wallet, network, pda);
}

function getCreateStreamInstruction(data: StreamData, pdaPub: PublicKey): TransactionInstruction {
    const {sender, receiver} = data;

    return new TransactionInstruction({
        keys: [{
            pubkey: new PublicKey(sender),
            isSigner: true,
            isWritable: true
        }, {
            pubkey: new PublicKey(receiver), //recipient
            isSigner: false,
            isWritable: true
        }, {
            pubkey: pdaPub, //PDA used for data
            isSigner: true,
            isWritable: true
        }, {
            pubkey: SystemProgram.programId, //system program required to make a transfer
            isSigner: false,
            isWritable: false
        }],
        programId: new PublicKey(PROGRAM_ID),
        data: encodeInstructionData(data),
    });
}


function encodeInstructionData(data: StreamData) {
    const {amount, start, end} = data;
    // Packed as little endian
    const layout = BufferLayout.struct([
        BufferLayout.u8("instruction"),
        BufferLayout.u32("start"),
        BufferLayout.u32("end"),
        // N.B. JS Number has 53 significant bits, so numbers larger than
        // 2^53 can be misrepresented
        BufferLayout.nu64("amount")
    ]);

    const encoded = Buffer.alloc(layout.span);
    layout.encode({
            instruction: INSTRUCTION_CREATE_STREAM,
            start: start,
            end: end,
            // amount: Number.MAX_SAFE_INTEGER // limited to 2^53 - 1 = 9007199254740991
            amount: Math.trunc(amount * LAMPORTS_PER_SOL),
        },
        encoded
    );

    // UInt64 alternative is to remove the "amount" from layout encoding and
    // use the following code:
    // //encoded.writeBigUInt64LE(BigInt("18446744073709551615"), 9)

    return encoded;
}