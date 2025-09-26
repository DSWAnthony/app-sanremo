import type { Request } from "@/types/request";
import { useState } from "react";


export const useRequestData = () => {
    const [requests, setRequests] = useState<Request[]>([]);


    

    return { requests, setRequests };
}