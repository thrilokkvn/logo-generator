"use client";

import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

export const Credits = ({credits}: {credits: number}) => {

    return (
        <Badge className="flex items-center gap-2 px-3 py-1.5 border border-yellow-300 bg-yellow-50 text-yellow-800 font-medium rounded-full shadow-sm">
            <Star className="h-4 w-4 fill-yellow-300 text-yellow-600" />
            <span className="text-sm">{credits} Credits</span>
        </Badge>
    );
}