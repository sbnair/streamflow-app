export default function Recipient(props: { onChange: void, value: string }) {
    return (
        <div className="col-span-full">
            <label htmlFor="account" className="block font-medium text-gray-700">
                Recipient Account
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name="account"
                    id="account"
                    defaultValue={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    pattern="[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{44}"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full border-gray-300 rounded-md"
                    placeholder="Please double check the address"
                    aria-describedby="account-description"
                    required
                />
            </div>
        </div>
    )
}