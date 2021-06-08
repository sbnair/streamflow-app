import {ExternalLinkIcon} from "@heroicons/react/outline";

export default function ToastrLink(props: { url: string, urlText: string, nonUrlText: string }) {
    const {url, urlText, nonUrlText} = props;
    return <span>{nonUrlText}<br/>
        <a className="font-bold"
           href={url} rel="noopener noreferrer"
           target="_blank">{urlText}<ExternalLinkIcon className="ml-1 w-4 h-4 inline"/>
        </a>
    </span>
}