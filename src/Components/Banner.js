import {XIcon} from '@heroicons/react/outline'
import {Component} from "react";

//could be "stupid"/functional component, but we decided to let it manage its own state (open/close)
export default class Banner extends Component {
    state = {
        hidden: false
    }

    render() {
        return (
            <div className={`relative bg-primary ${this.state.hidden && "hidden"}`}>
                <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="pr-16 sm:text-center sm:px-16">
                        <p className="font-small text-white">
                            <b>Devnet version. Test freely! </b>
                            <span className="hidden lg:inline">Transactions are slower. Live version coming soon™</span>
                        </p>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
                        <button type="button" onClick={() => this.setState({hidden: true})}
                                className="flex p-2 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <span className="sr-only">Dismiss</span>
                            <XIcon className="h-6 w-6 text-white"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}