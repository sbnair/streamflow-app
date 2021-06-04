import {useEffect, useMemo, useState} from "react";
import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    Keypair, TransactionInstruction, PublicKey,
} from "@solana/web3.js";
import {format, add, getUnixTime} from "date-fns";
import Wallet from "@project-serum/sol-wallet-adapter";
import {toast, ToastContainer} from "react-toastify";

import Recipient from "./Components/Recipient";
import SelectToken from "./Components/SelectToken";
import Banner from "./Components/Banner";
import DateTime from "./Components/DateTime";
import Amount from "./Components/Amount";
import Curtain from "./Components/Curtain";
import Streams from "./Components/Streams";
import {encodeData, Stream} from "./utils/helpers";

import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.png'
import {PROGRAM_ID} from "./constants/ids";
import ToastrLink from "./Components/ToastrLink";
import {DELAY_MINUTES, SOLLET_URL, AIRDROP_AMOUNT} from "./constants/constants";

function App() {
    const network = "http://localhost:8899"; //clusterApiUrl('localhost');
    const [providerUrl, setProviderUrl] = useState(SOLLET_URL);
    const connection = useMemo(() => new Connection(network), [network]);
    const urlWallet = useMemo(() => new Wallet(providerUrl, network), [providerUrl, network,]);
    const now = new Date();
    const pda = Keypair.generate();

    //State
    const [selectedWallet, setSelectedWallet] = useState(undefined);
    const [connected, setConnected] = useState(false);
    const [balance, setBalance] = useState(undefined);
    const [amount, setAmount] = useState(1);
    const [receiver, setReceiver] = useState("A4NseNL9CtSNFFhg84Gro18WorbfimeWHjcUXM2eLiTZ");
    const [startDate, setStartDate] = useState(format(now, "yyyy-MM-dd"));
    const [startTime, setStartTime] = useState(format(add(now, {minutes: DELAY_MINUTES}), "HH:mm"));
    const [endDate, setEndDate] = useState(startDate);
    const [endTime, setEndTime] = useState(startTime);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedWallet) {
            selectedWallet.on('connect', () => {
                setConnected(true);
                connection.getBalance(selectedWallet.publicKey)
                    .then(result => setBalance(result / LAMPORTS_PER_SOL));
                toast.success('Connected to wallet!');
            });
            selectedWallet.on('disconnect', () => {
                setConnected(false);
                setSelectedWallet(undefined);
                toast.info('Disconnected from wallet');
            });
            selectedWallet.connect();
            return () => {
                selectedWallet.disconnect();
            };
        }
    }, [connection, selectedWallet]);


    const streams = localStorage.streams ? JSON.parse(localStorage.streams) : {};
    console.log('streams', streams);
    for (const id in streams) {
        if (streams.hasOwnProperty(id)) {
            console.log('i', id)
            console.log(streams)
            // //todo fetching the "withdrawn" amount in background
            // //todo check for other fields too?
            // const buffer = connection.getAccountInfo(new PublicKey(id)).data;
            // const withdrawn = buffer.readBigUInt64LE(16);
            // console.log('wthdrwn', withdrawn);
            // streams.id.withdrawn = withdrawn;
        }
    }
    localStorage.setItem('streams', JSON.stringify(streams))
    console.log(JSON.stringify(streams));


    //todo view specific stream by reading from window.location.href


    function requestAirdrop() {
        connection.requestAirdrop(selectedWallet.publicKey, AIRDROP_AMOUNT * LAMPORTS_PER_SOL)
            .then(() => {
                setBalance(balance + AIRDROP_AMOUNT)
                toast.success("Big airdrop for you!")
            });
    }

    async function submit(e) {
        e.preventDefault();
        e.target.reportValidity();

        const start = getUnixTime(new Date(startDate + "T" + startTime));
        let end = getUnixTime(new Date(endDate + "T" + endTime));

        //todo check if this does anything at all
        if (!PublicKey.isOnCurve(selectedWallet.publicKey)) {
            document.getElementById('receiver').setCustomValidity('Invalid receiver. We just saved your money, yay!')
            return;
        }

        console.log('start %s, end %s', start, end);

        if (end < start) {
            document.getElementById('end_time').setCustomValidity("Err... End time before start time?")
            return;
        }

        // Make sure that end time is always AFTER start time
        end += end === start ? 1 : 0;

        const instruction = createInstruction({amount: amount, start: start, end: end, receiver: receiver})
        const tx = new Transaction().add(instruction);
        setLoading(true);
        await sendTransaction(tx);
        streams[pda.publicKey.toString()] = new Stream(
            selectedWallet.publicKey.toString(),
            receiver,
            amount,
            start,
            end,
            0);
        console.log('streams after tx', streams);
        //todo add to state in order to re-render
        localStorage.streams = JSON.stringify(streams);
    }

    function createInstruction(form): TransactionInstruction {
        const data = encodeData(form);
        return new TransactionInstruction({
            keys: [{
                pubkey: selectedWallet.publicKey, //sender
                isSigner: true,
                isWritable: true
            }, {
                pubkey: new PublicKey(form.receiver), //recipient
                isSigner: false,
                isWritable: true
            }, {
                pubkey: pda.publicKey, //PDA used for data
                isSigner: true,
                isWritable: true
            }, {
                pubkey: SystemProgram.programId, //system program required to make a transfer
                isSigner: false,
                isWritable: false
            }],
            programId: new PublicKey(PROGRAM_ID),
            data: data,
        });
    }

    async function sendTransaction(transaction) {
        try {
            toast.info('Getting recent blockhash...');

            transaction.recentBlockhash = (
                await connection.getRecentBlockhash()
            ).blockhash;

            toast.info('Sending signature request to wallet...');
            transaction.feePayer = selectedWallet.publicKey;
            console.log(pda.publicKey);
            transaction.partialSign(pda);
            let signed = await selectedWallet.signTransaction(transaction);

            toast.info('Got signature, submitting transaction');

            let signature = await connection.sendRawTransaction(signed.serialize());
            toast.info('Submitted transaction ' + signature + ', awaiting confirmation', {autoClose: 10000});
            await connection.confirmTransaction(signature, 'confirmed'); // can use 'finalized' which gives 100% certainty, but requires much longer waiting.
            const transactionUrl = `https://explorer.solana.com/tx/${signature}?cluster=custom&customUrl=${network}`;
            toast.success(<ToastrLink
                url={transactionUrl}
                urlText="View on explorer"
                nonUrlText="Transaction finalized"
            />, {autoClose: 30000, closeOnClick: false});
            connection.getBalance(selectedWallet.publicKey)
                .then(result => setBalance(result / LAMPORTS_PER_SOL));
        } catch (e) {
            console.warn(e);
            //todo log the error somewhere for our reference
            toast.error('Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Banner/>
            <div className={"max-w-lg mx-auto bg-blend-darken px-4"}>
                <div className="my-8">
                    <img src={logo} alt="StreamFlow Finance logo" className="w-24 mx-auto"/>
                    <h1 className="text-6xl text-center">Stream<strong>Flow</strong></h1>
                </div>
                {connected ? (
                    <div className="my-4">
                        <Curtain visible={loading}/>
                        <div className="mb-4">
                            <strong>My Wallet Account:</strong>
                            <span className="block truncate">{selectedWallet.publicKey.toBase58()}</span>
                        </div>
                        <div className="mb-4 clearfix">
                            <strong className="block">Balance:</strong>
                            <span>◎{balance}</span>
                            <button type="button" onClick={() => selectedWallet.disconnect()}
                                    className="float-right items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Disconnect
                            </button>
                            <button type="button" onClick={() => requestAirdrop()}
                                    className="float-right mr-2 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Airdrop
                            </button>
                        </div>
                        <hr/>
                        <form onSubmit={submit}>
                            <div className="my-4 grid gap-4 grid-cols-5 sm:grid-cols-2">
                                <Amount onChange={setAmount} max={balance}/>
                                <SelectToken/>
                                <Recipient onChange={setReceiver}/>
                                <DateTime
                                    title="start"
                                    date={startDate}
                                    updateDate={e => setStartDate(e.target.value)}//todo update, pass to child
                                    time={startTime}
                                    updateTime={e => setStartTime(e.target.value)}
                                />
                                <DateTime
                                    title="end"
                                    date={endDate}
                                    updateDate={e => setEndDate(e.target.value)}
                                    time={endTime}
                                    updateTime={e => setEndTime(e.target.value)}/>
                            </div>
                            <button type="submit"
                                    className="mt-8 block font-bold mx-auto place-self-center items-center px-8 py-4 border border-transparent text-2xl rounded-md shadow-sm text-white bg-primary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                                Stream Money
                            </button>
                        </form>
                        {streams &&
                        (
                            <div>
                                <hr className="my-8"/>
                                <h2 className="text-4xl text-center">My Streams</h2>
                                <Streams streams={streams} myAddress={selectedWallet.publicKey.toString()}/>
                            </div>)}
                    </div>
                ) : (
                    <div className="my-4">
                        <iframe width="100%" height={270} src="https://www.youtube.com/embed/KMU0tzLwhbE"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        <button type="button" onClick={(e) => setSelectedWallet(urlWallet)}
                                className="block font-bold text-xl my-5 mx-auto px-8 py-4 border bg-gradient-to-r from-primary via-primary to-primary border-transparent font-medium rounded shadow-sm text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Connect
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer hideProgressBar position="bottom-left" limit={4}/>
            <footer className="mt-24 text-center text-sm font-mono text-gray-400">
                <small><code>#BUIDL @ #SOLANASZN</code></small>
                <a href="https://solana.com/solanaszn" target="_blank" rel="noopener noreferrer">
                    <img src="https://solana.com/branding/logomark/logomark-gradient.png"
                         className="w-12 mx-auto my-2" alt="Solana logo"/>
                </a>
            </footer>
        </div>
    );
}

export default App;
