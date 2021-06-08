export const SOLLET_URL = 'https://www.sollet.io';
export const AIRDROP_AMOUNT = 10; //10 is the cap on the devnet

export const TX_FINALITY_CONFIRMED = "confirmed";
export const TX_FINALITY_FINALIZED = "finalized";

export const INSTRUCTION_CREATE_STREAM = 0;
export const INSTRUCTION_WITHDRAW_STREAM = 1;
export const INSTRUCTION_CANCEL_STREAM = 2;

export const ACC_DATA_OFFSET_WITHDRAWN = 25;

export const STREAM_STATUS_SCHEDULED = "scheduled";
export const STREAM_STATUS_STREAMING = "streaming";
export const STREAM_STATUS_COMPLETE = "complete";
export const STREAM_STATUS_CANCELED = "canceled";

export const STREAM_STATUS_COLOR = {
    [STREAM_STATUS_SCHEDULED]: 'gray', // now < start
    [STREAM_STATUS_STREAMING]: 'green', // start <= now < end
    [STREAM_STATUS_COMPLETE]: 'blue', //now >= end;
    [STREAM_STATUS_CANCELED]: 'red',
}