import {format, add} from "date-fns";

export default function DateTime(props: { title: string, date: string, updateDate: void, time: string, updateTime: void }) {
    return (
        <>
            <div className="col-span-3 sm:col-span-1">
                <label htmlFor={props.title}
                       className="block font-medium text-gray-100 capitalize">{props.title}</label>
                <div className="mt-1">
                    <input type="date" name={props.title} id={props.title}
                           value={props.date}
                           min={format(new Date(), "yyyy-MM-dd")}
                           max={format(add(new Date(), {years: 1}), "yyyy-MM-dd")}
                           onChange={props.updateDate}
                           className="shadow-sm focus:ring-black focus:border-primary block w-full border-gray-300 rounded-md"
                           placeholder="" aria-describedby={props.title + `-description`} required/>
                </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
                <label htmlFor={props.title + `_time`}
                       className="block font-medium text-gray-100 capitalize">{props.title} time</label>
                <div className="mt-1">
                    <input type="time" name={props.title + `_time`} id={props.title + `_time`}
                           value={props.time}
                           onChange={props.updateTime}
                           className="shadow-sm focus:ring-black focus:border-primary block w-full border-gray-300 rounded-md"
                           placeholder="" aria-describedby={props.title + `_time-description`} required/>
                </div>
            </div>
        </>
    )
}