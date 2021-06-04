import Badge from "./Stream/Badge";
import {getUnixTime} from "date-fns";
import Duration from "./Stream/Duration";
import Progress from "./Stream/Progress";
import {useEffect, useState} from "react";
import {StreamData} from "../utils/helpers";
import {EyeOffIcon, XIcon} from "@heroicons/react/outline";

const TYPE_ACTIVE = "streaming";
// const TYPE_RECEIVING = "receiving";
// const TYPE_FINISHED = "finished";
// const TYPE_INACTIVE = "inactive";

const COLORS = {
    TYPE_ACTIVE: 'green', // now < end
    // TYPE_RECEIVING: 'green', //unused for now
    // TYPE_FINISHED: 'gray', //now >= end; withdrawn < amount
    // TYPE_INACTIVE: 'black' //now >= end; withdrawn === amount
}

export default function Stream(props: { data: StreamData, myAddress: string }) {
    const {start, end, withdrawn, amount, receiver} = props.data;
    const {key, myAddress, removeStream} = props;

    const [streamed, setStreamed] = useState(getStreamed(start, end, amount))
    const [available, setAvailable] = useState(streamed - withdrawn);
    // const [streams, setStreams] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            setStreamed(getStreamed(start, end, amount));
            setAvailable(streamed - withdrawn);
          //  console.log('streamed %s, withdrawn %s, available %s', streamed, withdrawn, available);
        }, 1000)

        return () => clearInterval(interval);
    },);

    return (
        <dl key={key} className={`my-4 grid gap-y-4 gap-x-2 grid-cols-3 p-4 bg-white shadow rounded-lg`}>
            <div className="col-span-full">
            <Badge className="inline" type={TYPE_ACTIVE} color={COLORS.TYPE_ACTIVE}/>
            <button className="p-1.5 h-6 w-6 bg-blue-100 float-right align-top rounded-sm hover:bg-blue-300 focus:outline-none focus:ring-1"
                    onClick={removeStream}>
                <XIcon className="float-right w-3 h-3"/>
            </button>
            </div>
            <Duration start={start} end={end}/>
            <Progress title="Streamed" value={streamed} max={amount}/>
            <Progress title="Withdrawn" value={withdrawn} max={amount}/>
            {myAddress === receiver ? (
                <>
                    <dt>Available for withdrawal</dt>
                    <dd>{available.toFixed(2)}</dd>
                    <button
                        className="mx-auto col-span-full rounded-md text-sm bg-green-500 hover:bg-green-700 active:bg-green text-white py-1 px-2">
                        Withdraw
                    </button>
                </>
            ) : (
                <button
                    className="mx-auto col-span-full rounded-md text-sm bg-yellow-500 hover:bg-yellow-700 active:bg-yellow text-white py-1 px-2">
                    Cancel Stream</button>
            )}
        </dl>
    )
}

function getStreamed(start: number, end: number, amount: number) {
    let now = getUnixTime(new Date());

    if (now < start) return 0
    if (now > end) return amount;

  //  console.log('now %s, start %s, end %s', now, start, end);
    return (now - start) / (end - start) * amount;
}