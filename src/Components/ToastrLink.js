import {ExternalLinkIcon} from "@heroicons/react/outline";

export default function ToastrLink(props: { url: string, urlText: string, nonUrlText: string }) {
    return <span>{props.nonUrlText}<br/>
                <a className="font-bold"
                   href={props.url} rel="noopener noreferrer"
                   target="_blank">{props.urlText}<ExternalLinkIcon className="ml-1 w-4 h-4 inline"/>
                </a>
    </span>
}