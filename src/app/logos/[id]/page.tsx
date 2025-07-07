"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { colorPalettes } from "@/config/config";
import { logoDisplayType } from "@/types";
import axios from "axios";
import { Copy, Download, Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";

export default function Logo() {
    const [logoDetails, setLogoDetails] = useState<logoDisplayType | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        const getLogoDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/logo/${id}`);

                if (response.status < 200 || response.status > 299) {
                    toast.error("Error fetching logo details");
                    return;
                }

                const details = response.data[0];

                const formattedLogoData: logoDisplayType = {
                    id: details.id,
                    createdAt: details.created_at,
                    industry: details.industry,
                    logoStyle: details.logo_style,
                    title: details.title,
                    description: details.description,
                    includeBrandOrText: details.include_brand_or_text,
                    includeIcons: details.include_icons,
                    colorPalette: details.color_palette,
                    logoUrl: details.logo_url,
                };

                setLogoDetails(formattedLogoData);
            } catch (e: any) {
                toast.error(e.response.data.error || "Error fetching logo details");
                router.replace("/")
            } finally {
                setLoading(false);
            }
        };

        getLogoDetails();
    }, [id]);

    if (loading || !logoDetails) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <HashLoader color="oklch(49.6% 0.265 301.924)" />
                <Toaster richColors/>
            </div>
        );
    }

    const palette = colorPalettes.find(
        (p) => p.name.toLowerCase() === logoDetails.colorPalette?.toLowerCase()
    );

    const handleCopy = () => {
        if (!logoDetails.logoUrl) return;
        navigator.clipboard.writeText(logoDetails.logoUrl);
        setCopied(true);
        toast.success("Logo URL copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = async () => {
        if (!logoDetails.logoUrl) return;

        try {
            const response = await fetch(logoDetails.logoUrl, { mode: "cors" });

            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `${logoDetails.title || "logo"}-logo.png`;
            toast.success("Successfully downloaded the image");
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Download failed");
        }
    };

    const handleShare = async () => {
        if (navigator.share && logoDetails.logoUrl) {
            try {
                await navigator.share({
                    title: logoDetails.title,
                    url: logoDetails.logoUrl,
                });
            } catch (error) {
                toast.error("Share cancelled");
            }
        } else {
            toast.error("Sharing not supported on this browser");
        }
    };

    if (!loading && logoDetails) {
        return (
            <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30">
                <div className="mt-16 flex-grow flex flex-col md:flex-row items-center md:items-start max-w-7xl mx-auto w-full gap-8 md:gap-16">
                    <div className="flex flex-col w-full md:w-1/2 gap-6">
                        <h1 className="font-extrabold text-2xl md:text-4xl leading-tight text-foreground">
                            {logoDetails.title}
                        </h1>

                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md">
                            <img
                                src={logoDetails.logoUrl}
                                alt={logoDetails.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col w-full md:w-1/2 gap-5 text-left">
                        <div className="flex flex-col gap-1">
                            <Label className="font-semibold text-lg text-foreground">
                                Description:
                            </Label>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                {logoDetails.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="font-semibold text-lg text-foreground">
                                Industry:
                            </Label>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                {logoDetails.industry}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="font-semibold text-lg text-foreground">
                                Logo Style:
                            </Label>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                {logoDetails.logoStyle}
                            </p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="font-semibold text-lg text-foreground">
                                Created At:
                            </Label>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                {new Date(logoDetails.createdAt).toLocaleString()}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label className="font-semibold text-xl text-foreground mb-1">
                                Color Palette:
                            </Label>

                            <div className="flex items-center gap-3 flex-wrap">
                                {palette?.colors.map((color) => (
                                    <div
                                        key={color}
                                        className="w-10 h-10 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>

                            {!palette && (
                                <p className="text-muted-foreground italic">
                                    No color palette selected or palette not
                                    found.
                                </p>
                            )}
                        </div>

                        <div className="flex items-start space-x-3 space-y-0 mt-3">
                            <Checkbox checked={logoDetails.includeBrandOrText}/>
                            <div className="space-y-1 leading-none">
                                <h2 className="font-semibold">Include Text/Company Name</h2>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 space-y-0 mt-3">
                            <Checkbox checked={logoDetails.includeIcons}/>
                            <div className="space-y-1 leading-none">
                                <h2 className="font-semibold">Include Icon/Symbol</h2>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={handleDownload}
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Download
                            </Button>

                            <Button
                                size="lg"
                                variant={copied ? "default" : "outline"}
                                onClick={handleCopy}
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <Copy className="w-5 h-5" />
                                {copied ? "Copied!" : "Copy URL"}
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={handleShare}
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-5 h-5" />
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
                <Toaster richColors/>
            </div>
        );
    }
}
