import {useEffect, useMemo, useState} from "react";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {add, format, getUnixTime} from "date-fns";
import Wallet from "@project-serum/sol-wallet-adapter";
import {toast, ToastContainer} from "react-toastify";
import {ExternalLinkIcon} from "@heroicons/react/outline";
import Base58 from './lib/Base58'

import {Amount, Banner, Curtain, DateTime, getStreamed, Recipient, SelectToken, Stream, Logo, Footer} from "./Components";
import {_swal, getDecodedAccountData, getExplorerLink, streamCreated, StreamData} from "./utils/helpers";

import {AIRDROP_AMOUNT, DELAY_MINUTES, SOLLET_URL, STREAM_STATUS_CANCELED,} from "./constants/constants";
import {_createStream, _cancelStream, _withdrawStream} from './Actions'
import ButtonPrimary from "./Components/ButtonPrimary";

import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.png'
import NotConnected from "./Pages/NotConnected";

function App() {
    const network = "http://localhost:8899"; //clusterApiUrl('localhost');//todo update prior to deploy
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
        const newStreams = {...streams}
        const stream_id = window.location.pathname.substring(1);
        if (stream_id) {
            if (PublicKey.isOnCurve(Base58.decode(stream_id))) {
                newStreams[stream_id] = undefined;//we're setting the data few lines below
            } else {
                toast.error("Invalid Stream URL. Check with the sender.")
            }
        }


        for (const id in newStreams) {
            if (newStreams.hasOwnProperty(id)) {
                let pk = undefined
                try {
                    pk = new PublicKey(id);
                } catch (e) {
                    toast.error(e.message)
                }
                if (pk) {
                    connection.getAccountInfo(new PublicKey(id)).then(result => {
                        const temp = {...streams}
                        if (result?.data) {
                            console.log('id', id)
                            temp[id] = getDecodedAccountData(result.data);
                            console.log(temp[id])
                        } else {
                            if (id === stream_id) {
                                toast.error("Invalid Stream URL. Check with the sender.")
                            }
                            delete temp[id]
                            // if data doesn't exist - assume it's canceled
                            // setStreams({...streams, [id]: {...streams[id], status: STREAM_STATUS_CANCELED}})
                        }
                        setStreams(temp)
                        console.log({streams})
                    })
                }
            }
        }
        // this is on purpose, as we want it executed only once (during initialization)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.streams = JSON.stringify(streams);
    }, [streams])

    function requestAirdrop() {
        setLoading(true);
        //throttle airdrop requests
        (async () => {
            const signature = await connection.requestAirdrop(selectedWallet.publicKey, AIRDROP_AMOUNT * LAMPORTS_PER_SOL);
            const result = await connection.confirmTransaction(signature, 'confirmed');
            if (result.value.err) {
                toast.error('Error requesting airdrop')
            } else {
                setLoading(false)
                setBalance(balance + AIRDROP_AMOUNT)
                toast.success("Huge airdrop for you!")
            }
        })();
    }

    //todo additional form validation
    //before submit form.reportValidity() jer nesto nije touched.
    //kaze kuća moja nino za svaki element onsubmit
    //update balance ovde

    function validate(element) {
        const {name, value} = element;
        let start;

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

        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return false;
        }

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
            setStreams({...streams, [pda.publicKey.toBase58()]: data})
            const newBalance = await connection.getBalance(selectedWallet.publicKey);
            console.log('nb', newBalance)
            setBalance(newBalance / LAMPORTS_PER_SOL)
        }
    }

    async function withdrawStream(id: string) {
        const {start, end, amount} = streams[id];
        const success = await _withdrawStream(id, streams[id], connection, selectedWallet, network)
        if (success) {
            streams[id].withdrawn = getStreamed(start, end, amount);
            updateStreams()
        }
    }

    async function cancelStream(id: string) {
        const {start, end, amount} = streams[id];
        const now = new Date();
        const withdrawn = getStreamed(start, end, amount);
        const success = await _cancelStream(id, streams[id], connection, selectedWallet, network)
        if (success) {
            streams[id].withdrawn = withdrawn;
            streams[id].canceled_at = getUnixTime(now);
            streams[id].status = STREAM_STATUS_CANCELED;
            updateStreams()
        }
    }

    async function removeStream(id: string) {
        if (await _swal()) {
            const newStreams = {...streams}
            delete newStreams[id];
            setStreams(newStreams)
        }
    }

    function updateStreams() {
        localStorage.streams = JSON.stringify(streams);
        setStreams((JSON.parse(localStorage.streams)));
    }

    return (
        <div>
            <Banner/>
            <div className={"mx-auto bg-blend-darken px-4 my-4"}>
                <Logo src={logo}/>
                {connected ? (
                    <div className="mx-auto grid grid-cols-1 gap-16 max-w-lg xl:grid-cols-2 xl:max-w-5xl">
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
                                        className="float-right items-center px-2.5 py-1.5 shadow-sm text-xs  font-medium rounded bg-gray-500 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                    Disconnect
                                </button>
                                <ButtonPrimary text="Airdrop" action={requestAirdrop}
                                               className="float-right mr-2 px-2.5 py-1.5 text-xs my-0 rounded active:bg-white"
                                               disabled={loading}/>
                            </div>
                            <hr/>
                            <form onSubmit={createStream} id="form">
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
                                <ButtonPrimary text="Stream!" submit={true} className="font-bold text-2xl my-5"/>
                            </form>
                        </div>
                        {/*move to different file StreamsContainer */}
                        <div>
                            <strong className="text-white text-center text-2xl block">My Streams</strong>
                            {Object.keys(streams).length > 0 ? (
                                Object.entries(streams)
                                    .sort(([, stream1], [, stream2]) => stream2.start - stream1.start)
                                    .map(([id, data]) => (
                                        <Stream
                                            onStatusUpdate={(status) => setStreams({
                                                ...streams,
                                                [id]: {...streams[id], status}
                                            })}
                                            onWithdraw={() => withdrawStream(id)}
                                            onCancel={() => cancelStream(id)}
                                            key={id}
                                            id={id}
                                            data={data}
                                            myAddress={selectedWallet.publicKey.toBase58()}
                                            removeStream={() => removeStream(id)}/>
                                    ))
                            ) : (
                                //move to EmptyStreams
                                <div className="mx-auto my-10 text-white text-center">
                                    <span>Your streams will appear here.</span>
                                    <br/>
                                    <span>Start streaming!</span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <NotConnected action={() => setSelectedWallet(urlWallet)}/>
                )}
            </div>
            <ToastContainer hideProgressBar position="bottom-left" limit={4}/>
            <Footer/>
        </div>
    );
}

export default App;
