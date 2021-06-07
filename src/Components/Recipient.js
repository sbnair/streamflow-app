export default function Recipient(props: { onChange: void, value: string }) {
    return (
        <div className="col-span-full">
            <label htmlFor="account" className="block font-medium text-gray-100">
                Recipient Account
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name="account"
                    id="account"
                    defaultValue={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    pattern="[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44}"
                    className="text-white bg-gray-800 border-primary block w-full border-black rounded-md focus:ring-secondary focus:border-secondary"
                    placeholder="Please double check the address"
                    aria-describedby="account-description"
                    required
                />
            </div>
        </div>
    )
}