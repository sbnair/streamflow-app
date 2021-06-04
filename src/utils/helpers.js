import BufferLayout from "buffer-layout";
import {INSTRUCTION_CREATE_STREAM} from "../constants/ids";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";

export function encodeData(formData) {
    const {amount, start, end} = formData;
    // Packed as little endian
    const layout = BufferLayout.struct([
        BufferLayout.u8("instruction"),
        BufferLayout.u32("start"),
        BufferLayout.u32("end"),
        // N.B. JS Number has 53 significant bits, so numbers larger than
        // 2^53 can be misrepresented
        BufferLayout.nu64("amount")
    ]);

    const data = Buffer.alloc(layout.span);
    layout.encode({
            instruction: INSTRUCTION_CREATE_STREAM,
            start: start,
            end: end,
            // amount: Number.MAX_SAFE_INTEGER // limited to 2^53 - 1 = 9007199254740991
            amount: amount * LAMPORTS_PER_SOL, //todo math.trunc
        },
        data
    );

    // UInt64 alternative is to remove the "amount" from layout encoding and
    // use the following code:
    // //data.writeBigUInt64LE(BigInt("18446744073709551615"), 9)

    return data;
}

export function Stream(sender: string, receiver: string, amount: number, start: number, end: number, withdrawn: number) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.start = start;
    this.end = end;
    this.withdrawn = withdrawn;
}