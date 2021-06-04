export default function Curtain(props: { visible: * }) {
    console.log('visible', props.visible);
    return (
        <div className={`fixed top-0 bottom-0 left-0 right-0 bg-white opacity-90 ${props.visible ? "block" : "hidden"}`}>
        </div>
    )
}