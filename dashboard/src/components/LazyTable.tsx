"use client";
import dynamic from "next/dynamic";

export const Table = dynamic(() => import("../components/DataTable"), {
    ssr: false,
});
