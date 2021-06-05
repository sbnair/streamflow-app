import BufferLayout from "buffer-layout";
import {
    INSTRUCTION_CREATE_STREAM,
    STREAM_STATUS_COMPLETE,
    STREAM_STATUS_SCHEDULED,
    STREAM_STATUS_STREAMING
} from "../constants/constants";
import {clusterApiUrl, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {getUnixTime} from "date-fns";

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
            amount: Math.trunc(amount * LAMPORTS_PER_SOL),
        },
        data
    );

    // UInt64 alternative is to remove the "amount" from layout encoding and
    // use the following code:
    // //data.writeBigUInt64LE(BigInt("18446744073709551615"), 9)

    return data;
}

export function getDecodedAccountData(buffer: Buffer) {
    const start = buffer.readBigUInt64LE(0);
    const end = buffer.readBigUInt64LE(8);
    const amount = buffer.readBigUInt64LE(16);
    const withdrawn = Number(buffer.readBigUInt64LE(24));
    const sender = PublicKey.decode(buffer.slice(32, 64)).toBase58();
    const recipient = PublicKey.decode(buffer.slice(64, 96)).toBase58();
    const status = getStreamStatus(Number(start), Number(end), getUnixTime(new Date())) //in milliseconds

    return new StreamData(sender, recipient, amount, start, end, withdrawn, status);
}

export function getExplorerLink(type: string, id: string, network?: string): string {
    network = network || clusterApiUrl('mainnet-beta');
    return `https://explorer.solana.com/${type}/${id}?cluster=custom&customUrl=${network}`;

}

export function getStreamStatus(start: number, end: number, now: number) {
    if (now < start) {
        return STREAM_STATUS_SCHEDULED
    } else if (now < end) {
        return STREAM_STATUS_STREAMING
    } else {
        return STREAM_STATUS_COMPLETE
    }
}

export function StreamData(sender: string, receiver: string, amount: number, start: number, end: number, withdrawn: number, status: string) {
    this.sender = sender;
    this.receiver = receiver;
    this.amount = amount;
    this.start = start;
    this.end = end;
    this.withdrawn = withdrawn || 0;
    this.status = status || STREAM_STATUS_SCHEDULED;
}