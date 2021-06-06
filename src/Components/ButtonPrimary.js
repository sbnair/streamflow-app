export default function ButtonPrimary(props: {text: string, action?: void, className?: string, submit?: boolean, disabled?: boolean}) {
    const baseClasses = "block mx-auto px-8 py-4 bg-gradient-to-br from-primary via-primary to-secondary border-transparent font-medium rounded shadow-sm text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary "
    const {text, action, className, submit, disabled} = props;
    return (
        <button type={submit ? "submit" : "button"} onClick={action}
                className={baseClasses + className} disabled={disabled}>
            {text}
        </button>
    )
}