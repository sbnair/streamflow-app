import {LAMPORTS_PER_SOL} from "@solana/web3.js";

export default function Progress(props: { title: string, value: number, max: number }) {
    let {value, max} = props;
    value = (value/LAMPORTS_PER_SOL).toFixed(10);
    max = (max/LAMPORTS_PER_SOL).toFixed(10);
    return (
        <>
            <dt>{props.title}</dt>
                <input type="range"
                    min={0} max={props.max}
                    value={props.value} readOnly={true}/>
                <label className="ml-2 text-right">◎{(value * LAMPORTS_PER_SOL).toFixed(2)}<small className="text-gray-400">/{(max * LAMPORTS_PER_SOL).toFixed(2)}</small></label>
        </>
    )
}