import {useEffect, useMemo, useState} from "react";
import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    Keypair, PublicKey,
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
import Stream, {getStreamed} from "./Components/Stream";
import {
    StreamData,
    getExplorerLink,
    getDecodedAccountData,
    _swal,
    copyToClipboard,
    streamCreated
} from "./utils/helpers";

import swal from "sweetalert";

import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.png'
import {
    DELAY_MINUTES,
    SOLLET_URL,
    AIRDROP_AMOUNT, STREAM_STATUS_CANCELED,
} from "./constants/constants";
import Logo from "./Components/Logo";
import _createStream from "./Actions/createStream";
import _cancelStream from "./Actions/cancelStream";
import _withdrawStream from "./Actions/withdrawStream";
import ButtonPrimary from "./Components/ButtonPrimary";

function App() {
    const network = "http://localhost:8899"; //clusterApiUrl('localhost');
    const now = new Date();
    const pda = Keypair.generate();

    const [providerUrl,] = useState(SOLLET_URL);
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
                    } else {
                        // if data doesn't exist - assume it's canceled
                        streams[id].status = STREAM_STATUS_CANCELED;
                        // delete streams[id];
                    }
                })
            }
        }
        localStorage.setItem('streams', JSON.stringify(streams))
    }, [connection, streams])

    //TODO view specific stream by reading from window.location.href

    function requestAirdrop() {
        setLoading(true);
        //throttle this request since we won't periodically poll to update the balance
        setTimeout(() => {
            connection.requestAirdrop(selectedWallet.publicKey, AIRDROP_AMOUNT * LAMPORTS_PER_SOL)
                .then(() => {
                    setBalance(balance + AIRDROP_AMOUNT)
                    toast.success("Huge airdrop for you!")
                })
            setLoading(false);
        }, 4000)
    }

    //todo additional form validation

    function validate(element) {
        const {name, value} = element;
        let start, end;


        let msg = "";

        switch (name) {
            case "account":
                msg = PublicKey.isOnCurve((new PublicKey(value)).toBytes()) ? "Invalid address. We just saved your money, yay!" : "";
                break;
            case "start":
                start = new Date(value + "T" + startTime);
                msg = start < new Date() ? "Cannot start the stream in the past." : "";
                break;
            case "start_time":
                start = new Date(startDate + "T" + value);
                console.log('now', new Date())
                msg = start < new Date() ? "Cannot start the stream in the past." : "";
                break;
            case "end":
                msg = new Date(value) < new Date(startDate) ? "Umm... end date before the start date?" : "";
                break;
            case "end_time":
                start = new Date(startDate + "T" + startTime);
                const end = new Date(endDate + "T" + value);
                msg = end < start ? "Err... end time before the start time?" : "";
                break;
            default:
        }
        // console.log('end %s start %s now %s msg %s', end, start, (new Date()), msg)
        element.setCustomValidity(msg);
    }

    async function createStream(e) {
        e.preventDefault();
        e.target.reportValidity();

        const start = getUnixTime(new Date(startDate + "T" + startTime));
        let end = getUnixTime(new Date(endDate + "T" + endTime));
        //console.log('start %s, end %s', start, end);

        // Make sure that end time is always AFTER start time
        if (end === start) {
            end = start + 1;
        }

        setLoading(true);
        const data = new StreamData(selectedWallet.publicKey.toBase58(), receiver, amount, start, end);
        const success = await _createStream(data, connection, selectedWallet, network, pda)
        setLoading(false);
        if (success) {
            streamCreated(pda.publicKey.toBase58())
            addStream(pda.publicKey.toBase58(), data);
        }
    }

    async function withdrawStream(id: string) {
        const {start, end, amount} = streams[id];
        await _withdrawStream(id, streams[id], connection, selectedWallet, network)
        streams[id].withdrawn = getStreamed(start, end, amount);
        updateStreams()
    }

    async function cancelStream(id: string) {
        if (await _swal()) {
            const {start, end, amount} = streams[id];
            const now = new Date();
            const withdrawn = getStreamed(start, end, amount);
            await _cancelStream(id, streams[id], connection, selectedWallet, network)
            streams[id].withdrawn = withdrawn;
            streams[id].canceled_at = getUnixTime(now);
            streams[id].status = STREAM_STATUS_CANCELED;
            updateStreams()
        }
    }

    function addStream(id: string, data: StreamData) {
        streams[id] = data;
        updateStreams();
    }

    async function removeStream(id: string) {
        if (await _swal()) {
            delete streams[id];
            updateStreams()
        }
    }

    function updateStreams() {
        localStorage.streams = JSON.stringify(streams);
        setStreams((JSON.parse(localStorage.streams)));
    }

    function updateStreamStatus(id, status) {
        streams[id].status = status;
        updateStreams()
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
                            <div className="mb-4 text-white">
                                <strong className="text-gray-400 hover:text-white">
                                    <a href={getExplorerLink('address', selectedWallet.publicKey.toBase58(), network)}
                                       target="_blank" rel="noopener noreferrer">
                                        My Wallet Account <ExternalLinkIcon className="ml-1 w-4 h-4 inline"/>:
                                    </a></strong>
                                <span className="block truncate">{selectedWallet.publicKey.toBase58()}</span>
                            </div>
                            <div className="mb-4 clearfix text-white">
                                <strong className="block">Balance:</strong>
                                <span>◎{balance}</span>
                                <button type="button" onClick={() => selectedWallet.disconnect()}
                                        className="float-right items-center px-2.5 py-1.5 shadow-sm text-xs font-medium rounded bg-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    Disconnect
                                </button>
                                <button type="button" onClick={() => requestAirdrop()}
                                        className="float-right mr-2 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    Airdrop
                                </button>
                            </div>
                            <hr/>
                            <form onSubmit={createStream}>
                                <div className="my-4 grid gap-4 grid-cols-5 sm:grid-cols-2">
                                    <Amount onChange={setAmount} value={amount} max={balance}/>
                                    <SelectToken/>
                                    <Recipient onChange={setReceiver} value={receiver}/>
                                    <DateTime
                                        title="start"
                                        date={startDate}
                                        updateDate={e => {
                                            setStartDate(e.target.value);
                                            validate(e.target)
                                        }}//todo update, pass to child
                                        time={startTime}
                                        updateTime={e => {
                                            setStartTime(e.target.value);
                                            validate(e.target)
                                        }}
                                    />
                                    <DateTime
                                        title="end"
                                        date={endDate}
                                        updateDate={e => {
                                            setEndDate(e.target.value);
                                            validate(e.target)
                                        }}
                                        time={endTime}
                                        updateTime={e => {
                                            setEndTime(e.target.value);
                                            validate(e.target)
                                        }}/>
                                </div>
                                <ButtonPrimary text="Stream!" action={() => {
                                }} submit={true}/>
                            </form>
                        </div>
                        {/*move to different file*/}
                        <div>
                            <strong className="text-white text-center text-2xl block">My Streams</strong>
                            {Object.keys(streams).length > 0 ? (
                                Object.entries(streams)
                                    .sort(([, stream1], [, stream2]) => stream2.start - stream1.start)
                                    .map(([id, data]) => (
                                        <Stream
                                            onStatusUpdate={(status) => updateStreamStatus(id, status)}
                                            onWithdraw={() => withdrawStream(id)}
                                            onCancel={() => cancelStream(id)}
                                            key={id}
                                            id={id}
                                            data={data}
                                            myAddress={selectedWallet.publicKey.toBase58()}
                                            removeStream={() => removeStream(id)}/>
                                    ))
                            ) : (
                                <div className="mx-auto my-10 text-white text-center">
                                    <span>Your streams will appear here.</span>
                                    <br/>
                                    <span>Start streaming!</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-lg mx-auto">
                        <iframe width="100%" height={270} src="https://www.youtube.com/embed/KMU0tzLwhbE"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>&nbsp;</iframe>
                        <ButtonPrimary text="Connect" action={() => setSelectedWallet(urlWallet)}/>
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
