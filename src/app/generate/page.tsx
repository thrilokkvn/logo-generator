"use client";

import { ColorPalette } from "@/components/ColorPalette";
import { CustomTextarea } from "@/components/CustomTextarea";
import { InputBar } from "@/components/Inputbar";
import { SelectElement } from "@/components/SelectElement";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { industries, logoStyles } from "@/config/config";
import { logoDetails } from "@/types";
import { ArrowLeft, BadgeCheck, Layers, Palette, Text } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialState = {
    title: "",
    description: "",
    industry: "",
    logoStyle: "",
    colorPalette: "",
    includeBrandOrText: false,
    includeIcons: false,
};

export default function GenerateLogo() {
    const [logoDetails, setLogoDetails] = useState<logoDetails>(initialState);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        setLogoDetails((prev) => ({
            ...prev,
            [name]: e.target.value,
        }));
    };

    console.log(logoDetails)

    return (
        <div className="mt-16 min-h-screen px-10 md:px-20 white:bg-muted">
            <Button variant={"ghost"} onClick={() => router.push("/")}>
                <ArrowLeft /> Back to Home
            </Button>
            <div className="px-10 mt-5">
                <h1 className="font-bold text-xl md:text-3xl text-foreground">
                    Create your Logo
                </h1>
                <p className="font-semibold text-lg text-muted-foreground mt-1">
                    Tell us about your brand and we'll create the perfect logo for you
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div className="p-5 border border-gray-600 border-1 rounded-md">
                        <div className="flex items-center gap-2">
                            <Text />{" "}
                            <span className="font-semibold text-xl">Basic Information</span>
                        </div>
                        <p className="text-muted-foreground">
                            Tell us about your brand and vision
                        </p>
                        <div>
                            <InputBar
                                id="brand-title"
                                title="Brand/ Company Name"
                                name="title"
                                placeholder="Enter your brand name"
                                type="text"
                                onChange={handleInputChange}
                                value={logoDetails.title}
                            />
                            <CustomTextarea
                                id="brand-description"
                                title="Brand Description"
                                name="description"
                                placeholder="Describe what your brand does, your values, and what you want to convey"
                                onChange={handleInputChange}
                                value={logoDetails.description}
                            />
                            <p className="text-muted-foreground text-sm">
                                Be specific about your brand's personality and target audience
                            </p>
                            <SelectElement value={logoDetails.industry} setLogoDetails={setLogoDetails} label="Industry" placeholder="Select your Industry" arrayelements={industries} name="industry"/>

                            <Separator className="mt-5 mb-3"/>
                            <div className="flex items-center gap-2">
                                <Layers />
                                <span className="font-semibold text-xl">Logo Preferences</span>
                            </div>

                            <div className="flex items-start space-x-3 space-y-0 mt-3">
                                <Checkbox onCheckedChange={() => {setLogoDetails(prev => ({...prev, includeBrandOrText: !prev.includeBrandOrText}))}}/>
                                <div className="space-y-1 leading-none">
                                    <h2 className="font-semibold">Include Text/Company Name</h2>
                                    <p className="text-sm text-muted-foreground">Include your brand name in the logo design</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 space-y-0 mt-3">
                                <Checkbox onCheckedChange={() => {setLogoDetails(prev => ({...prev, includeIcons: !prev.includeIcons}))}}/>
                                <div className="space-y-1 leading-none">
                                    <h2 className="font-semibold">Include Icon/Symbol</h2>
                                    <p className="text-sm text-muted-foreground">Include a graphic element or icon in the logo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border border-gray-600 border-1 rounded-md">
                        <div className="flex items-center gap-2">
                            <Palette />{" "}
                            <span className="font-semibold text-xl">Design Preferences</span>
                        </div>
                        <p className="text-muted-foreground">
                            Choose the visual style for your logo
                        </p>
                        <div>
                            <SelectElement value={logoDetails.logoStyle} setLogoDetails={setLogoDetails} label="Logo Style" placeholder="Select a Logo Style" arrayelements={logoStyles} name="logoStyle"/>
                            <ColorPalette setLogoDetails={setLogoDetails} name="colorPalette" value={logoDetails.colorPalette}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
