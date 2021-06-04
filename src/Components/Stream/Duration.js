import {format, fromUnixTime} from "date-fns";

export default function Duration(props: { start: number, end: number }) {
    return (
        <dt className="col-span-full text-center">
            <b>{(format(fromUnixTime(props.start), "dd/MM/yy HH:mm"))} &ndash; {(format(fromUnixTime(props.start), "dd/MM/yy HH:mm"))}</b>
        </dt>
    )
}