import {ExternalLinkIcon} from "@heroicons/react/outline";

export default function Link(props: { url: string, title?: string, className?: string }) {
    const {url, title, className} = props;

    return (
        <strong className={"text-gray-300 hover:text-white " + className}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {title || url} <sup><ExternalLinkIcon className="w-3 h-3 inline"/></sup>
            </a>
        </strong>
    )
}