export default function Badge(props: { type: string, color: string }) {
    const {type, color } = props;
    return <div className="inline">
        <span
            className={`align-top px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 capitalize`}>
            <svg className={`mr-1 -ml-1 inline align-baseline h-2 w-2 text-${color}-400`} fill="currentColor" viewBox="0 0 8 8">
              <circle cx={4} cy={4} r={3}/>
            </svg>
            {type}
      </span></div>
}