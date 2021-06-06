import ButtonPrimary from "../Components/ButtonPrimary";

export default function NotConnected(props: { action: () => * }) {
    return <div className="max-w-lg mx-auto">
        <iframe width="100%" height={270} src="https://www.youtube.com/embed/KMU0tzLwhbE"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>&nbsp;</iframe>
        <ButtonPrimary text="Connect" className="font-bold text-2xl my-5"
                       action={props.action}/>
    </div>;
}