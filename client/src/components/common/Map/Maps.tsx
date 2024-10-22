import Script from "next/script";

export default function Map1() {
    return (
        <div className="mx-auto max-w-[826px]">
            <div
                className="strava-embed-placeholder"
                data-embed-type="route"
                data-embed-id="3283694775464226432"
                data-full-width="true"
                data-style="standard"
                data-map-hash="12.97/-25.97499/32.58061"
                data-from-embed="true"
            ></div>
            <Script src="https://strava-embeds.com/embed.js"></Script>
        </div>
    );
}
