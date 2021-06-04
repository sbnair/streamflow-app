export default function Badge(props: { type: string, color: string }) {
    return <div>
        <span
        className={`inline items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${props.color}-100 text-${props.color}-800 capitalize`}>
        {props.type}
      </span></div>
}