// function Newsletter() {
//     const [email, setEmail] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle newsletter subscription
//         console.log('Subscribing email:', email);
//         setEmail('');
//     };

//     return (
//         <div className="bg-gray-50 py-16">
//             <div className="container mx-auto px-4 text-center grid grid-cols-1">
//                 <h2 className="text-3xl font-bold mb-4">Subscribe Newsletter</h2>
//                 <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//                     You learn today and earn tomorrow. The roots of education are bitter but the fruits are sweet.
//                 </p>

//                 <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex">
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Enter Your Email Address"
//                         className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//                         required
//                     />
//                     <button
//                         type="submit"
//                         className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
//                     >
//                         Subscribe
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Newsletter;

import React, { useState } from 'react';

function Newsletter() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Subscribing email:', email);
        setEmail('');
    };

    return (
        <div className="bg-gray-50 py-8 md:py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe Newsletter</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm md:text-base">
                    You learn today and earn tomorrow. The roots of education are bitter but the fruits are sweet.
                </p>

                <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email Address"
                        className="flex-1 px-4 py-2 text-sm sm:text-base rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 text-sm sm:text-base rounded-r-lg hover:bg-indigo-700 transition-colors"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Newsletter;





