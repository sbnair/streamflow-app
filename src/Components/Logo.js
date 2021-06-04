export default function Logo(props: {src: string}){
    return (
        <div className="mb-8">
            <img src={props.src} alt="StreamFlow Finance logo" className="w-24 mx-auto"/>
            <h1 className="text-6xl text-center">Stream<strong>Flow</strong></h1>
        </div>
    )
}