export default function Progress(props: { title: string, value: number, max: number, rtl?: boolean }) {
    let {title, value, max, rtl} = props;
    value = Number(value).toFixed(2);
    max = Number(max).toFixed(2);
    return (
        <>
            <dt>{title}</dt>
            {/*<input type="range" dir={rtl ? "rtl" : "ltr"}*/}
            {/*       min={0} max={max}*/}
            {/*       value={value} readOnly={true}/>*/}
            <div className="rounded-xl h-3 bg-white w-full">
                <div
                    className={"bg-gradient-to-r from-primary to-secondary rounded-xl h-full" + (rtl ? "float-right" : "")}
                    style={{width: value / max * 100 + "%"}}>
                </div>
            </div>
            <label className="ml-2 text-right truncate">◎{value}<small className="text-gray-400">/{max}</small></label>
        </>
    )
}