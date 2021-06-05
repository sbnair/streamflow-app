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
import {ExternalLinkIcon} from "@heroicons/react/outline";

import Recipient from "./Components/Recipient";
import SelectToken from "./Components/SelectToken";
import Banner from "./Components/Banner";
import DateTime from "./Components/DateTime";
import Amount from "./Components/Amount";
import Curtain from "./Components/Curtain";
import Stream from "./Components/Stream";
import {encodeData, StreamData, getExplorerLink, getDecodedAccountData, getStreamStatus} from "./utils/helpers";

import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.png'
import {PROGRAM_ID} from "./constants/ids";
import ToastrLink from "./Components/ToastrLink";
import {
    DELAY_MINUTES,
    SOLLET_URL,
    AIRDROP_AMOUNT,
    ACC_DATA_OFFSET_WITHDRAWN,
    STREAM_STATUS_SCHEDULED, STREAM_STATUS_STREAMING, STREAM_STATUS_COMPLETE,
} from "./constants/constants";
import Logo from "./Components/Logo";

function App() {
    const network = "http://localhost:8899"; //clusterApiUrl('localhost');
    const now = new Date();
    const pda = Keypair.generate();

    const [providerUrl, setProviderUrl] = useState(SOLLET_URL);
    const [selectedWallet, setSelectedWallet] = useState(undefined);
    const [connected, setConnected] = useState(false);
    const [balance, setBalance] = useState(undefined);
    const [amount, setAmount] = useState(1.337); //todo remove
    const [receiver, setReceiver] = useState("A4NseNL9CtSNFFhg84Gro18WorbfimeWHjcUXM2eLiTZ"); //todo remove
    const [startDate, setStartDate] = useState(format(now, "yyyy-MM-dd"));
    const [startTime, setStartTime] = useState(format(add(now, {minutes: DELAY_MINUTES}), "HH:mm"));
    const [endDate, setEndDate] = useState(startDate);
    const [endTime, setEndTime] = useState(startTime);
    const [loading, setLoading] = useState(false);
    const [streams, setStreams] = useState(localStorage.streams ? JSON.parse(localStorage.streams) : {})

    const connection = useMemo(() => new Connection(network), [network]);
    const urlWallet = useMemo(() => new Wallet(providerUrl, network), [providerUrl, network]);

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

    useEffect(() => {
        //todo fetch the "withdrawn" amount in background
        for (const id in streams) {
            if (streams.hasOwnProperty(id)) {
                connection.getAccountInfo(new PublicKey(id)).then(result => {
                    if (result?.data) {
                        const data = getDecodedAccountData(result.data)
                        streams[id].withdrawn = data.withdrawn / LAMPORTS_PER_SOL;

                        streams[id].status = data.status;
                        console.log('decoded data', id, data)
                        console.log('stream data', id, streams[id])
                    } else {
                        // should we delete the stream?
                        // delete streams[id];
                    }
                })
            }
        }
        console.log('streams updated?', streams);
        localStorage.setItem('streams', JSON.stringify(streams))
    }, [connection, streams])

    //TODO view specific stream by reading from window.location.href

    function requestAirdrop() {
        setLoading(true);
        //throttle requests in order to ease the network load
        setTimeout(() => {
            connection.requestAirdrop(selectedWallet.publicKey, AIRDROP_AMOUNT * LAMPORTS_PER_SOL)
                .then(() => {
                    setBalance(balance + AIRDROP_AMOUNT)
                    toast.success("Big airdrop for you!")
                })
            setLoading(false);
        }, 3000)
    }

    //todo additional form validation
    function setFormState(e) {
        const [name, value] = e.target;
        switch (name) {
            case "account":
                if (!PublicKey.isOnCurve((new PublicKey(value)).toBytes())) {
                    e.target.setCustomValidity('Invalid receiver. We just saved your money, yay!')
                    e.target.reportValidity();
                } else {
                    setReceiver(value);
                }
                break;
            case "end":
                break;
            default:

        }
    }

    async function submit(e) {
        const end_time_input = document.getElementById('end_time')
        e.preventDefault();
        e.target.reportValidity();

        const start = getUnixTime(new Date(startDate + "T" + startTime));
        let end = getUnixTime(new Date(endDate + "T" + endTime));

        console.log('start %s, end %s', start, end);

        // end_time_input.setCustomValidity('');
        // end_time_input.reportValidity();
        // if (end < start) {
        //     end_time_input.setCustomValidity("Err... End time before start time?")
        //     end_time_input.reportValidity();
        //     return false;
        // }

        // Make sure that end time is always AFTER start time
        if (end <= start) {
            end = start + 1;
        }

        const instruction = createInstruction({amount: amount, start: start, end: end, receiver: receiver})
        const tx = new Transaction().add(instruction);
        setLoading(true);
        await sendTransaction(tx);
        const streamData = new StreamData(selectedWallet.publicKey.toBase58(), receiver, amount, start, end);
        addStream(pda.publicKey.toBase58(), streamData);
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
            transaction.recentBlockhash = (
                await connection.getRecentBlockhash()
            ).blockhash;

            toast.info('Sending signature request to wallet...');
            transaction.feePayer = selectedWallet.publicKey;
            transaction.partialSign(pda);
            const signed = await selectedWallet.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signed.serialize());
            toast.info('Submitted transaction. Awaiting confirmation...');
            // can use 'finalized' which gives 100% certainty, but requires much longer waiting.
            const txid = await connection.confirmTransaction(signature, 'confirmed').then(
                () => {
                    connection.getBalance(selectedWallet.publicKey).then(
                        result => setBalance(result / LAMPORTS_PER_SOL)
                    )
                })
            const transactionUrl = `https://explorer.solana.com/tx/${signature}?cluster=custom&customUrl=${network}`;
            toast.success(<ToastrLink
                url={transactionUrl}
                urlText="View on explorer"
                nonUrlText="Transaction confirmed!"
            />, {autoClose: 30000, closeOnClick: false});
            //todo SHARE STREAM URL

            return txid;
        } catch (e) {
            console.warn(e);
            //todo log the error somewhere for our reference
            toast.error('Error: ' + e.message);
        } finally {
            await setLoading(false);
        }
    }

    function addStream(id: string, data: StreamData) {
        streams[id] = data;
        localStorage.streams = JSON.stringify(streams);
        setStreams((JSON.parse(localStorage.streams)));
    }

    function removeStream(id: string) {
        delete streams[id];
        localStorage.streams = JSON.stringify(streams);
        setStreams(JSON.parse(localStorage.streams));
    }

    return (
        <div>
            <Banner/>
            <div className={"mx-auto bg-blend-darken px-4 my-4"}>
                <Logo src={logo}/>
                {connected ? (
                    <div className="mx-auto grid grid-cols-1 gap-10 max-w-lg xl:grid-cols-2 xl:max-w-5xl">
                        <div className="mb-8">
                            <Curtain visible={loading}/>
                            <div className="mb-4">
                                <strong>
                                    <a href={getExplorerLink('address', selectedWallet.publicKey.toBase58(), network)}
                                       target="_blank" rel="noopener noreferrer">
                                        My Wallet Account <ExternalLinkIcon className="ml-1 w-4 h-4 inline"/>:
                                    </a></strong>
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
                                    <Amount onChange={setAmount} value={amount} max={balance}/>
                                    <SelectToken/>
                                    <Recipient onChange={setReceiver} value={receiver}/>
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
                        </div>
                        {/*move to different file*/}
                        <div>
                            <strong>My Streams</strong>
                            {streams ? (
                                Object.entries(streams)
                                    .sort(([, stream1],[,stream2])=> stream1.start - stream2.start)
                                    .map(([id, data]) => (
                                    <Stream
                                        key={id}
                                        id={id}
                                        data={data}
                                        myAddress={selectedWallet.publicKey.toBase58()}
                                        removeStream={() => removeStream(id)}/>
                                ))
                            ) : (
                                <span>Your streams will appear here!</span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-lg mx-auto">
                        <iframe width="100%" height={270} src="https://www.youtube.com/embed/KMU0tzLwhbE"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>&nbsp;</iframe>
                        <button type="button" onClick={() => setSelectedWallet(urlWallet)}
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
