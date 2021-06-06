import Badge from "./Stream/Badge";
import {getUnixTime} from "date-fns";
import Duration from "./Stream/Duration";
import Progress from "./Stream/Progress";
import {useEffect, useState} from "react";
import {StreamData} from "../utils/helpers";
import {XIcon} from "@heroicons/react/outline";
import {
    STREAM_STATUS_CANCELED,
    STREAM_STATUS_COLOR, STREAM_STATUS_COMPLETE,
    STREAM_STATUS_SCHEDULED,
    STREAM_STATUS_STREAMING
} from "../constants/constants";

export default function Stream(props: { data: StreamData, myAddress: string, id: string, removeStream: void, onStatusUpdate: void, onCancel: void, onWithdraw: void }) {
    const {start, end, withdrawn, amount, receiver, sender, status} = props.data;
    const {myAddress, removeStream, onStatusUpdate, onCancel, onWithdraw, id} = props;
    const showButton = status === STREAM_STATUS_STREAMING;
    const color = STREAM_STATUS_COLOR[status];

    const [streamed, setStreamed] = useState(getStreamed(start, end, amount))
    const [available, setAvailable] = useState(streamed - withdrawn);

    useEffect(() => {
        const interval = setInterval(() => {
            setStreamed(getStreamed(start, end, amount));
            setAvailable(streamed - withdrawn);
            const tmpStatus = updateStatus(status, start, end);
            if (tmpStatus !== status) {
                onStatusUpdate(tmpStatus)
            }
            //  console.log('streamed %s, withdrawn %s, available %s', streamed, withdrawn, available);
        }, 1000)
        return () => clearInterval(interval);
    });

    return (
        <dl className={`text-white my-4 grid gap-y-4 gap-x-2 grid-cols-3 p-4 bg-${color}-800 bg-opacity-20 hover:bg-opacity-40 shadow rounded-lg`}>
            <div className="col-span-full">
                <Badge className="inline" type={status} color={color}/>
                <button onClick={removeStream}
                        className={`p-1.5 h-6 w-6 float-right align-top rounded-sm hover:bg-${color}-100 focus:outline-none focus:ring-1`}>
                    <XIcon className="float-right w-3 h-3"/>
                </button>
            </div>
            <Duration start={start} end={end}/>
            <dt>ID</dt>
            <dd className="col-span-2 text-sm text-gray-400 truncate">{id}</dd>
            <dt>Recipient</dt>
            <dd className="col-span-2 text-sm text-gray-400 truncate">{receiver}</dd>
            {status === STREAM_STATUS_CANCELED ? (
                <>
                    <Progress title="Withdrawn" value={withdrawn} max={amount}/>
                    <Progress title="Returned" value={amount - withdrawn} max={amount} rtl={true}/>
                </>
            ) : (
                <>
                    <Progress title="Streamed" value={streamed} max={amount}/>
                    <Progress title="Withdrawn" value={withdrawn} max={amount}/>
                    {myAddress === receiver &&
                    (<>
                        <dt>Available<br/>
                            <sup className="text-xs text-gray-300 align-top">for withdrawal</sup></dt>
                        <dd className="col-span-2">◎{available.toFixed(2)}</dd>
                        {showButton && (<button onClick={onWithdraw}
                                                className="rounded-md text-sm bg-green-500 hover:bg-green-700 active:bg-green text-white py-1 px-2">
                            Withdraw
                        </button>)}
                    </>)}
                    {myAddress === sender && showButton && (<button onClick={onCancel}
                                                                    className="rounded-md text-sm bg-red-400 hover:bg-red-600 active:bg-red text-white py-1 px-2">
                        Cancel</button>)}
                </>)}
        </dl>
    )
}

export function getStreamed(start: number, end: number, amount: number, timestamp?: number) {
    timestamp = timestamp || getUnixTime(new Date());

    if (timestamp < start) return 0
    if (timestamp > end) return amount;

    //  console.log('timestamp %s, start %s, end %s', timestamp, start, end);
    return (timestamp - start) / (end - start) * amount;
}

function updateStatus(status: string, start: number, end: number) {
    const now = getUnixTime(new Date());
    if (status === STREAM_STATUS_SCHEDULED && now >= start) {
        return STREAM_STATUS_STREAMING;
    } else if (status === STREAM_STATUS_STREAMING && now >= end) {
        return STREAM_STATUS_COMPLETE;
    } else {
        return status;
    }
}