import {memo} from 'react'
import {format, fromUnixTime} from "date-fns";

function Duration(props: { start: number, end: number }) {
    return (
        <dt className="col-span-full text-center">
            {(format(fromUnixTime(props.start), "yyyy-MM-dd HH:mm"))} &ndash; {(format(fromUnixTime(props.end), "yyyy-MM-dd HH:mm"))}
        </dt>
    )
}

export default memo(Duration);