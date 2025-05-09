import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const [macAddress, setMacAddress] = useState('');
    const [macAddressLookupResults, setMacAddressLookupResults] = useState<{
        mac_addresses: { vendor: string, mac_address: string }[];
        errors: string[];
    }>({
        mac_addresses: [],
        errors: []
    });
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if(macAddress.length === 0) return alert('Please enter a MAC address');

        setLoading(true);
        try {
            const res = await axios.post(route('mac_address.lookup.post'), {
                mac_address: macAddress
            });
            setLoading(false);
            setMacAddressLookupResults(res.data);
        }catch(error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                setMacAddressLookupResults({
                    mac_addresses: [],
                    errors: error.response.data.errors.mac_address
                });
            }
        }
    }

    const displayMacAddressLookupResults = () => {
        if(loading) return false;
        if (macAddressLookupResults.mac_addresses?.length > 0) {
            return (
                <>
                    <h2 className="text-lg font-bold">{macAddressLookupResults.mac_addresses.length } Vendor(s) Found</h2>
                    <ul>
                        {macAddressLookupResults.mac_addresses.map((entry, index) => (
                            <>
                                <li className="mt-3 mb-3 border-l-3 border-green-500 p-4" key={index}>
                                    <div className="w-full flex flex-row justify-between">
                                        <span className="text-gray-500">Mac Address:</span> 
                                        <span className="">{entry.mac_address}</span>
                                    </div>
                                    <div className="w-full flex flex-row justify-between">
                                        <span className="text-gray-500">Vendor:</span> 
                                        <span className="">{entry.vendor}</span>
                                    </div>
                                </li>
                            </>
                        ))}
                    </ul>
                </>
            );
        } else if (macAddressLookupResults.mac_addresses.length === 0 && macAddressLookupResults.errors.length === 0 && macAddress && !loading) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <span className="text-5xl">💬</span> 
                    <span>Typing...</span>
                </div>
            )
        } else if (macAddressLookupResults.mac_addresses.length === 0 && macAddressLookupResults.errors.length === 0 && !macAddress) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <span className="text-5xl">🤓</span> 
                    <span>Waiting for a MAC address...</span>
                </div>
                
            );
        }
    }

    const displayErrorsMacAddressLookupErrors = () => {
        if(loading) {
            return (
                <div className="flex flex-col justify-center items-center">
                    <span className="text-5xl">🔍</span> 
                    <span>Loading...</span>
                </div>
            );
        }
        if (macAddressLookupResults.errors.length > 0) {
            return (
                <>
                    <h2 className="text-red-500 text-lg font-semibold">{macAddressLookupResults.errors.length } Error(s) found</h2>
                    <ul>
                        {macAddressLookupResults.errors.map((error, index) => (
                            <>
                                <li className="mt-2 mb-2 border-l-3 border-red-500 p-4" key={index}>{error}</li>
                                { macAddressLookupResults.errors.length !== index+1 ? (<hr/>) : null}
                            </>
                        ))}
                    </ul>
                </>
            );
        }   
    }

    const handleMacAddressChange = (e) => {
        setMacAddress(e.target.value);
    }

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="text-3xl pb-5 font-semibold">Mac Address Lookup</div>
                <div className="flex w-full justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full flex-col lg:max-w-4xl">
                        <div className="flex flex-row">
                            <Input
                                type="text"
                                placeholder="Enter MAC Address"
                                className="mb-4 mr-4"
                                value={macAddress}
                                onChange={handleMacAddressChange}
                                />
                            <Button onClick={submit} className="bg-indigo-500" disabled={loading}>
                                {loading ? 'Loading...' : 'Lookup'}
                            </Button>
                        </div>
                        <div className="text-sm text-gray-500 mb-4">Tip: use comma delimited format to search multiple mac addresses</div>
                        <div className="mb-2">
                            {displayErrorsMacAddressLookupErrors()}
                        </div>
                        <div className="mt-2">
                            {displayMacAddressLookupResults()}
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
