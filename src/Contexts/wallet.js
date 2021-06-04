import React, {useContext, useEffect, useMemo, useState} from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import {toast} from "react-toastify";

function toHex(buffer) {
    return Array.prototype.map
        .call(buffer, (x) => ('00' + x.toString(16)).slice(-2))
        .join('');
}

export const w = {
    wallet: null,
    connected: false,
    provider: undefined,
    select: undefined
}

export function WalletAdapter() {
    const network = clusterApiUrl('devnet');
    const [providerUrl, setProviderUrl] = useState('https://www.sollet.io');
    const connection = useMemo(() => new Connection(network), [network]);
    const urlWallet = useMemo(() => new Wallet(providerUrl, network), [
        providerUrl,
        network,
    ]);
    const injectedWallet = useMemo(() => {
        try {
            return new Wallet(window.solana, network);
        } catch (e) {
            console.log(`Could not create injected wallet: ${e}`);
            return null;
        }
    }, [network]);
    const [selectedWallet, setSelectedWallet] = useState(undefined);
    const [, setConnected] = useState(false);

    useEffect(() => {
        if (selectedWallet) {
            selectedWallet.on('connect', () => {
                setConnected(true);

                toast.success('Connected to wallet ' + selectedWallet.publicKey.toBase58());
            });
            selectedWallet.on('disconnect', () => {
                setConnected(false);
                toast.info('Disconnected from wallet');
            });
            selectedWallet.connect();
            return () => {
                selectedWallet.disconnect();
            };
        }
    }, [selectedWallet]);

    async function sendTransaction() {
        try {
            let transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: selectedWallet.publicKey,
                    toPubkey: selectedWallet.publicKey,
                    lamports: 100,
                })
            );
            toast.info('Getting recent blockhash...');
            transaction.recentBlockhash = (
                await connection.getRecentBlockhash()
            ).blockhash;
            toast.info('Sending signature request to wallet...');
            transaction.feePayer = selectedWallet.publicKey;
            let signed = await selectedWallet.signTransaction(transaction);
            toast.info('Got signature, submitting transaction');
            let signature = await connection.sendRawTransaction(signed.serialize());
            toast.info('Submitted transaction ' + signature + ', awaiting confirmation');
            await connection.confirmTransaction(signature, 'singleGossip');
            toast.success('Transaction ' + signature + ' confirmed');
        } catch (e) {
            console.warn(e);
            toast.error('Error: ' + e.message);
        }
    }

    async function signMessage() {
        try {
            const message = "Please sign this message for proof of address ownership.";
            toast.info('Sending message signature request to wallet');
            const data = new TextEncoder().encode(message);
            const signed = await selectedWallet.sign(data, 'hex');
            toast.success('Got signature: ' + toHex(signed.signature));
        } catch (e) {
            console.warn(e);
            toast.error('Error: ' + e.message);
        }
    }

    return (
        <div className="Wallet">
            <div>Network: {network}</div>
            {selectedWallet && selectedWallet.connected ? (
                <div>
                    <div>Wallet address: {selectedWallet.publicKey.toBase58()}.</div>
                    <button onClick={sendTransaction}>Send Transaction</button>
                    <button onClick={signMessage}>Sign Message</button>
                    <button onClick={() => selectedWallet.disconnect()}>Disconnect</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => setSelectedWallet(urlWallet)}>Connect to Wallet</button>
                    <button onClick={() => setSelectedWallet(injectedWallet)}>Connect to Injected Wallet</button>
                </div>
            )}
        </div>
    );
}

//
// export function useWallet() {
//     const { wallet, connected, provider, select } = useContext(WalletContext);
//     return {
//         wallet,
//         connected,
//         provider,
//         select,
//         publicKey: wallet?.publicKey,
//         connect() {
//             wallet ? wallet.connect() : select();
//         },
//         disconnect() {
//             wallet?.disconnect();
//         },
//     };
// }