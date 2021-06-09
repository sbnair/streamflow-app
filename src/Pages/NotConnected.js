import ButtonPrimary from "../Components/ButtonPrimary";

export default function NotConnected(props: { action: () => * }) {
    return <div className="max-w-md mx-auto">
        <iframe width="100%" height={270} src="https://www.youtube-nocookie.com/embed/7HWzcxu-De0"
                title="StreamFlow Finance Demo" frameBorder="0"
                allowFullScreen>&nbsp;</iframe>
        <ButtonPrimary text="Connect" className="font-bold text-2xl my-5"
                       action={props.action}/>
    </div>;
}