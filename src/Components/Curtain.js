export default function Curtain(props: { visible: boolean }) {
    return (
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-gray-900 opacity-90 z-10 ${props.visible ? "block" : "hidden"}`}>
            <div className="loader"> </div>
        </div>
    )
}