import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";

const Domains = () => {
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState("");

    const fetchDomains = async () => {
        const domainsSnapshot = await getDocs(collection(db, "domains"));
        setDomains(domainsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const addDomain = async () => {
        if (!newDomain.trim()) return;
        await addDoc(collection(db, "domains"), { name: newDomain, status: "active" });
        setNewDomain("");
        fetchDomains();
    };

    const archiveDomain = async (id) => {
        await updateDoc(doc(db, "domains", id), { status: "archived" });
        fetchDomains();
    };

    useEffect(() => {
        fetchDomains();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Domains</h1>
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Add a new domain"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="border p-2"
                />
                <button
                    onClick={addDomain}
                    className="bg-green-500 text-white p-2 rounded ml-2"
                >
                    Add Domain
                </button>
            </div>

            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {domains.map((domain) => (
                        <tr key={domain.id}>
                            <td>{domain.name}</td>
                            <td>{domain.status}</td>
                            <td>
                                {domain.status === "active" && (
                                    <button
                                        onClick={() => archiveDomain(domain.id)}
                                        className="bg-yellow-500 text-white p-2 rounded"
                                    >
                                        Archive
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Domains;
