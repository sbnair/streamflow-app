export default function ButtonPrimary(props: {text: string, action: void, className?: string, submit?: boolean}) {
    const baseClasses = "block font-bold text-2xl my-5 mx-auto px-8 py-4 bg-gradient-to-br from-primary via-primary to-secondary border-transparent font-medium rounded shadow-sm text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary "
    const {text, action, className, submit} = props;
    return (
        <button type={submit ? "submit" : "button"} onClick={action}
                className={baseClasses + className} >
            {text}
        </button>
    )
}