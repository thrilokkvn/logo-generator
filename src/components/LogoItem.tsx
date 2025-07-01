import { logoDisplayType } from "@/types"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Download, Trash2 } from "lucide-react"

export const LogoItem = ({details}:{details: logoDisplayType}) => {
    return (
        <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={details.logoUrl}
                    alt={details.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {details.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{details.logoStyle}</span>
                    <span>{details.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {}}
                    className="flex-1"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {}}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
    )
}