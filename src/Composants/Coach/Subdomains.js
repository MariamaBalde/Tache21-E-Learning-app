import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc
} from "firebase/firestore";

const Subdomains = () => {
    const [domains, setDomains] = useState([]);
    const [subdomains, setSubdomains] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState("");
    const [newSubdomain, setNewSubdomain] = useState("");

    const fetchDomains = async () => {
        const domainsSnapshot = await getDocs(collection(db, "domains"));
        setDomains(domainsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const fetchSubdomains = async () => {
        const subdomainsSnapshot = await getDocs(collection(db, "subdomains"));
        setSubdomains(subdomainsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const addSubdomain = async () => {
        if (!newSubdomain.trim() || !selectedDomain) return;
        await addDoc(collection(db, "subdomains"), {
            name: newSubdomain,
            domainId: selectedDomain
        });
        setNewSubdomain("");
        fetchSubdomains();
    };

    useEffect(() => {
        fetchDomains();
        fetchSubdomains();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Subdomains</h1>
            <div className="my-4">
                <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="border p-2"
                >
                    <option value="">Select a Domain</option>
                    {domains.map((domain) => (
                        <option key={domain.id} value={domain.id}>
                            {domain.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Add a new subdomain"
                    value={newSubdomain}
                    onChange={(e) => setNewSubdomain(e.target.value)}
                    className="border p-2 ml-2"
                />
                <button
                    onClick={addSubdomain}
                    className="bg-green-500 text-white p-2 rounded ml-2"
                >
                    Add Subdomain
                </button>
            </div>

            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Domain</th>
                    </tr>
                </thead>
                <tbody>
                    {subdomains.map((subdomain) => (
                        <tr key={subdomain.id}>
                            <td>{subdomain.name}</td>
                            <td>{domains.find((d) => d.id === subdomain.domainId)?.name || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Subdomains;
