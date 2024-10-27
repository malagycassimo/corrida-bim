"use server";

export const submitData = async (data: Record<string, string | boolean>) => {
    const { accept, ...rest } = data;
    try {
        await fetch("http://server:3002/participants/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rest),
        });
    } catch (e) {
        if (e instanceof Error) {
            await fetch(process.env.DISCORD_URL as string, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        source: "CLIENT",
                        data,
                        e: e.message,
                        accept,
                    },
                    null,
                    2,
                ),
            });
        }
        console.error(e);
    }
};

export const getIsAvailable = async (): Promise<boolean> => {
    try {
        const response = await fetch("http://server:3002/participants/fetch", {
            cache: "no-store",
        });
        const data: { route: string }[] = await response.json();
        const filtered = data.filter(({ route }) =>
            route.includes("Corrida Pedestre - 15km"),
        );
        if (filtered.length >= 1800) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        if (e instanceof Error) {
            await fetch(process.env.DISCORD_URL as string, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        source: "CLIENT",
                        e: e.message,
                    },
                    null,
                    2,
                ),
            });
        }
        return false;
    }
};
