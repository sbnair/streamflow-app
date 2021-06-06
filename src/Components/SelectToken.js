export default function SelectToken() {
    return (
        <div className="col-span-2 sm:col-span-1">
            <label htmlFor="token" className="block font-medium text-gray-100">
                Token
            </label>
            <select
                id="token"
                name="token"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary  rounded-md"
                defaultValue="SOL"
            >
                <option>SOL</option>
                <option disabled>ETH - Coming soon️™</option>
                <option disabled>BTC - Coming soon™</option>
                <option disabled>USDC - Coming soon™</option>
                <option disabled>Other tokens...</option>
            </select>
        </div>
    )
}
