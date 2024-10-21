import Script from "next/script";

export default function Map1() {
    return (
        <div className="max-w-fit mx-auto">
            <div
                className="strava-embed-placeholder"
                data-embed-type="route"
                data-embed-id="3282116688013871634"
                data-style="standard"
                data-from-embed="false"
            ></div>
            <Script src="https://strava-embeds.com/embed.js"></Script>
        </div>
    );
}
