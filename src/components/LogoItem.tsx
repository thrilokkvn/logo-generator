"use client";

import { logoDisplayType } from "@/types"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { ArrowRight, Download } from "lucide-react"
import { LogoStyleBadge } from "./LogoStyleBadge"
import { IndustryBadge } from "./IndustryBadge"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const LogoItem = ({details}:{details: logoDisplayType}) => {
    const router = useRouter();

    const handleDownload = async () => {
        if (!details.logoUrl) return;

        try {
            const response = await fetch(details.logoUrl, { mode: "cors" });

            if (!response.ok) {
                throw new Error("Failed to fetch image");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `${details.title || "logo"}-logo.png`;
            toast.success("Successfully downloaded the image");
            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            if(error) toast.error("Download failed");
        }
    };

    return (
        <Card className="group hover:shadow-xl transition-shadow border border-muted p-2 rounded-2xl bg-background">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={details.logoUrl}
                    alt={details.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="font-semibold text-foreground truncate text-lg">
                      Brand: <span className="text-purple-400 font-bold">{details.title}</span>
                    </h3>
                    <LogoStyleBadge logoStyle={details.logoStyle}/>
                  </div>
                  <div className="flex flex-col items-start gap-3 text-md text-muted-foreground">
                    <IndustryBadge industry={details.industry}/>
                    <p><span className="font-semibold">Created at: </span> {new Date(details.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDownload}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button size={"sm"} variant={"outline"} onClick={() => router.push(`/logos/${details.id}`)}>
                    Details <ArrowRight className="w-3 h-3 ml-1"/>
                  </Button>
                </div>
              </CardContent>
            </Card>
    )
}