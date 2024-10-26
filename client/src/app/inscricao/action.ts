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
