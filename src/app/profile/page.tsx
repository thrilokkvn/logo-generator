"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userType } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "sonner";

export default function Profile() {
    const [user, setUser] = useState<userType>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getUserDetails = async() => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:3000/api/user");
                if (response.status < 200 || response.status > 299) {
                    toast.error("Unable to fetch the User Details");
                    return;
                }

                const formattedUserData: userType = {
                    email: response.data.user.user.email,
                    firstName: response.data.user.user.user_metadata.first_name,
                    lastName: response.data.user.user.user_metadata.last_name,
                    registeredAt: response.data.user.user.created_at
                }

                console.log(formattedUserData)

                setUser(formattedUserData);
            } catch (e) {
                toast.error("Unable to fetch the User Details");
            } finally {
                setLoading(false);
            }
        }

        getUserDetails();
    }, []);

    let month;
    let year;

    if (user) {
        const registeredDate = new Date(user.registeredAt);
        const monthInt = registeredDate.getMonth() + 1;
        year = registeredDate.getFullYear();

        switch (monthInt) {
            case 1:
                month = "January"
                break;
            case 2:
                month = "February"
                break;
            case 3:
                month = "March"
                break;
            case 4:
                month = "April"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "June"
                break;
            case 7:
                month = "July"
                break;
            case 8:
                month = "August"
                break;
            case 9:
                month = "September"
                break;
            case 10:
                month = "October"
                break;
            case 11:
                month = "November"
                break;
            case 12:
                month = "December"
                break;
            default:
                break;
        }
    }

    
    console.log(user)

    if (loading || !user) {
        return (
            <div className="min-h-full flex justify-center items-center">
                <HashLoader className="text-foreground" />
            </div>
        );
    }


    if (!loading && user) {
        return (
        <div className="flex flex-col min-h-full justify-center items-center mt-12 md:mt-24 mb-24">
            <h1 className="font-bold md:text-4xl mb-10 text-2xl">
                User Details
            </h1>
            <div className="p-10 rounded-md border-solid border-2 flex flex-col items-center shadow-lg">
                <Avatar className="outline-none w-24 h-24 rounded-full overflow-hidden">
                    <AvatarImage
                        className="object-contain"
                        src="https://github.com/shadcn.png"
                    />
                    <AvatarFallback>{user?.firstName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 items-center mt-4 mb-4">
                    <p>
                        <span className="font-semibold">First Name</span>:{" "}
                        <span className="mr-3">{user?.firstName}</span>
                    </p>
                    <p>
                        <span className="font-semibold">Last Name</span>:{" "}
                        <span className="mr-3">{user?.lastName}</span>
                    </p>
                    <p>
                        <span className="font-semibold">Email</span>:{" "}
                        <span>{user?.email}</span>
                    </p>
                </div>
                <p>
                    Member since
                    <span className="font-semibold"> {month} {year}</span>
                </p>
            </div>

            <Button className="mt-4" onClick={() => router.push("/")}>Back to Home</Button>
        </div>
    );
    }
}
