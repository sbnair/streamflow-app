import {ExternalLinkIcon} from "@heroicons/react/outline";

export default function Link(props: { url: string, title?: string, className?: string }) {
    const {url, title, className} = props;

    return (
        <strong className={"text-gray-400 hover:text-white " + className}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                {title || url} <ExternalLinkIcon className="ml-1 w-4 h-4 inline"/>:
            </a>
        </strong>
    )
}