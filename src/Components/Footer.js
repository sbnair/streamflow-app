export default function Footer() {
    return (<footer className="mt-40 text-center text-sm font-mono text-gray-400">
        <img src="https://solana.com/branding/horizontal/logo-horizontal-gradient-dark.png"
             className="w-40 mx-auto my-2" alt="Solana logo"/>
        <small>
            <code>BUIDLed by <a href="https://streamflow.finance" className="text-gray-300" rel="noopener noreferrer"
                                target="_blank">StreamFlow</a><br/>
                during <a href="https://solana.com/solanaszn" target="_blank" className="text-gray-300"
                   rel="noopener noreferrer">SOLANASZN</a></code></small>
    </footer>)
}