export default function Progress(props: { title: string, value: number, max: number }) {
    return (
        <>
            <dt>{props.title}</dt>
                <input type="range"
                    min={0} max={props.max}
                    value={props.value} readOnly={true}/>
                <label className="ml-2 text-right">{props.value} <small className="text-gray-400"> / {props.max} SOL</small></label>
        </>
    )
}