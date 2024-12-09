import React, { useState } from "react";
import { Heart } from 'lucide-react';

const GradientCard = ({ title, icon: Icon, gradient }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className={`relative p-6 rounded-2xl shadow-lg ${gradient} aspect-[1.6/1]`}>
            <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 bg-white/20 rounded-full p-2 backdrop-blur-sm transition-transform hover:scale-110"
                aria-label={isLiked ? "Unlike" : "Like"}
            >
                <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-white text-white" : "text-white"
                        }`}
                />
            </button>

            <div className="h-full flex flex-col">
                <div className="mb-auto">
                    <Icon className="h-12 w-12 text-white/90" strokeWidth={1.5} />
                </div>
                <h3 className="text-white text-xl font-medium">{title}</h3>
            </div>
        </div>
    );
};

export default GradientCard;