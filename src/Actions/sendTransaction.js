import {toast} from "react-toastify";
import {Connection, Keypair, Transaction} from "@solana/web3.js";
import ToastrLink from "../Components/ToastrLink";
import Wallet from "@project-serum/sol-wallet-adapter";
import {INSTRUCTION_CREATE_STREAM} from "../constants/constants";
import swal from 'sweetalert'

export default async function sendTransaction(type: number, transaction: Transaction, connection: Connection, wallet: Wallet, network?: string, pda?: Keypair) {
    try {
        transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        toast.info('Sending request to wallet...');
        transaction.feePayer = wallet.publicKey;

        if (type === INSTRUCTION_CREATE_STREAM) {
            transaction.partialSign(pda);
        }

        const signed = await wallet.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signed.serialize());
        toast.info('Submitted transaction. Awaiting confirmation...');

        // can use 'finalized' which gives 100% certainty, but requires much longer waiting.
        await connection.confirmTransaction(signature, 'confirmed')
        const transactionUrl = `https://explorer.solana.com/tx/${signature}?cluster=custom&customUrl=${network}`;
        toast.success(<ToastrLink
            url={transactionUrl}
            urlText="View on explorer"
            nonUrlText="Transaction confirmed!"
        />, {autoClose: 30000, closeOnClick: false});

        if (type === INSTRUCTION_CREATE_STREAM) {
            swal({
                icon: "success",
                title: "Stream created!",
                content: "Share it: " + window.location.origin + pda.publicKey.toBase58()
            });
        }
        return true;
    } catch (e) {
        console.warn(e);
        //todo log the error somewhere for our reference
        toast.error('Error: ' + e.message);
        return false;
    }
}