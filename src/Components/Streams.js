import Badge from "./Stream/Badge";
import {format, fromUnixTime, getUnixTime} from "date-fns";
import Duration from "./Stream/Duration";
import Progress from "./Stream/Progress";

const TYPE_STREAMING = "streaming";
const TYPE_RECEIVING = "receiving";
const TYPE_FINISHED = "finished";
const TYPE_INACTIVE = "inactive";

const COLORS = {
    TYPE_STREAMING: 'blue', // now < end
    // TYPE_RECEIVING: 'green', //unused for now
    TYPE_FINISHED: 'gray', //now >= end; withdrawn < amount
    TYPE_INACTIVE: 'black' //now >= end; withdrawn === amount
}

export default function Streams(props: { streams: Object, myAddress: string }) {
    console.log('colors', COLORS);
    console.log('colors streaming', COLORS.TYPE_STREAMING);

    return (
        <>
            {Object.entries(props.streams).map(([id, s]) => (
                <dl className={`my-4 grid gap-4 grid-cols-3 p-4 bg-white shadow rounded-lg bg-blue-50`} key={id}>
                    <Badge type={TYPE_STREAMING} color={COLORS.TYPE_STREAMING}/>
                    <Duration start={s.start} end={s.end}/>
                    <Progress title="Streamed" value={getStreamed(s.start, s.end, s.amount)} max={s.amount} />
                    <Progress title="Withdrawn" value={s.withdrawn} max={s.amount} />
                    {props.myAddress === s.receiver ? (
                        <>
                            <dt>Available for withdrawal</dt>
                            <dd>{setInterval(() => {
                                return getStreamed(s.start, s.end, s.amount) - s.withdrawn
                            }, 1000)}</dd>
                            <button>Withdraw</button>
                        </>
                    ) : (
                        <button className="mx-auto col-span-full rounded-lg bg-red-500 hover:bg-red-700 active:bg-red-900 text-white py-2 px-4">Cancel Stream</button>
                    )
                    }
                </dl>
            ))}
        </>
    )
}

function getStreamed(start: number, end: number, amount: number) {
    let now = getUnixTime(new Date());

    if (now < start) return 0
    if (now > end) return amount;

    console.log('now %s, start %s, end %s', now, start, end);
    return (now - start) / (end - start) * amount;
}

function getColor() {

}