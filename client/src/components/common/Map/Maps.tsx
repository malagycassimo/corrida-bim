import { useEffect } from "react";
import AnimatedComponent from "../AnimatedComponent";

export default function Map1({ embedId }: { embedId: string }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://strava-embeds.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <AnimatedComponent>
            <div
                className="strava-embed-placeholder"
                data-embed-type="route"
                data-embed-id={embedId}
                data-full-width="true"
                data-style="standard"
                data-map-hash="12.97/-25.97499/32.58061"
                data-from-embed="true"
            ></div>
        </AnimatedComponent>
    );
}
