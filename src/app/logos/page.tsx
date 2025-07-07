"use client";

import { LogoItem } from "@/components/LogoItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { industries } from "@/config/config";
import { logoDisplayType } from "@/types";
import axios from "axios";
import { ArrowRight, Plus, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Logos() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const [logos, setLogos] = useState<logoDisplayType[]>([]);

    const getLogos = async() => {
        try {
            const response = await axios.get("/api/logo");
            if (response.status < 200 || response.status > 299) {
                toast.error("Error fetching Logos");
                return;
            }

            const logoData = response.data;

            const formattedLogoData = logoData.map((each: any) => ({
                createdAt: each.created_at,
                id: each.id,
                industry: each.industry,
                logoUrl: each.logo_url,
                title: each.title,
                logoStyle: each.logo_style
            }));

            setLogos(formattedLogoData);

        } catch (e: any) {
            toast.error(e.message || "Error fetching Logos")
        }
    }

    useEffect(() => {
        getLogos();
    }, []);

    const filteredBySearch = logos.filter(each => each.title.toLowerCase().includes(searchQuery.toLowerCase()));
    const filteredLogos = filteredBySearch.filter(each => each.industry.toLowerCase().includes(selectedFilter.toLowerCase()));

    return (
        <div className="min-h-screen p-5 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30">
            <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">My Logos</h1>
                    <p className="text-muted-foreground mt-1">Manage and Organize your Logos</p>
                </div>
                <Button onClick={() => router.push("/generate")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Logo
                </Button>
            </div>
            <div className="flex gap-4 items-center px-8">
                <div className="mt-3 flex-[8] flex items-center relative">
                    <Input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search your Logos"
                        className="w-full p-5 focus-visible:ring-0 outline-none"
                    />
                    <Search className="absolute top-2 right-2 p-1" />
                </div>

                <div className="mt-3 flex flex-[2] items-center gap-2">
                <Select
                    onValueChange={(val) => setSelectedFilter(val)}
                    value={selectedFilter}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by Industry" />
                    </SelectTrigger>
                    <SelectContent>
                    {industries.map((each, index) => (
                        <SelectItem key={index} value={each}>
                            {each}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>

                {selectedFilter && (
                    <button
                    type="button"
                    onClick={() => setSelectedFilter("")}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    title="Clear filter">
                        <X className="w-4 h-4" />
                    </button>
                )}
                </div>
            </div>
            
            {filteredLogos.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-5 px-8">
                {filteredLogos.map((each, index) => (
                    <LogoItem key={index} details={each}/>
                ))}
            </div>}

            {logos.length === 0 && <div className="flex flex-col p-10 gap-3 justify-center items-center mx-auto">
                <p className="text-md md:text-xl text-accent-foreground">You don&apos;t have any logos</p>
                <Button onClick={() => router.push("/generate")} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                    Create Logo
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
            </div>}

            {(logos.length > 0 && filteredLogos.length === 0) && <div className="flex justidy-center items-center mx-auto p-10">
                <p className="text-md md:text-xl text-muted-foreground">No Logos matching the filters</p>
            </div>}
        </div>
    )
}