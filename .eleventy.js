const htmlmin = require("html-minifier");
module.exports = function (eleventyConfig) {

    eleventyConfig.addShortcode("fig", function (url) {
        let height = 6
        if (url.includes('_S')) { height = 4 }
        if (url.includes('_M')) { height = 6 }
        if (url.includes('_L')) { height = 10 }
        const small = "/assets/images/" + url.replace(/\.(jpe?g|png)/gi, '@1500w.webp').trim();
        const large = "/assets/images/" + url.replace(/\.(jpe?g|png)/gi, '@1500w.webp').trim();

        let content = ''
        if (large.includes('.webp')) {
            content = `
                <img loading="lazy" style='height: ${height}em' srcset="${small} 700w, ${large} 1500w" src="${small}"/>
            `
        } else if (large.includes('.mp4')) {
            content = `<video loading="lazy" autoplay muted loop style='height: ${height}em' data-src="${large}"></video>`
        } else {
            content = `<img loading="lazy" style='height: ${height}em' src="${large}"/>`
        }
        if (url.length > 1) {
            return (
                `<figure data-cursorText="arrowRight" style='height: ${height}em' data-original='${url}' data-large="${large}" class='work-figure'>
                    ${content}
                    <button data-cursorText="Expand" class='figure-expand'>
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
                 </svg>
                </button>
                </figure>
                `
            );
        }
    });

    eleventyConfig.addShortcode("brackets", function (bracket, count) {
        let output = ''
        for (let i = 0; i < count; i++) {
            output += bracket
        }

        return `<span class="bracket">${output}</span>`
    });

    eleventyConfig.addPairedShortcode("link", function (content, url) {
        const prettyURL = url.replace(/(https?:\/\/)|(\/$)/gi, '');

        return `<span class="externalLink-wrapper">${content}<a href='${url}' data-cursorText="${prettyURL}" class='externalLink'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path class="cls-1" d="M23.8457.3068V22.21L22.248,23.6545V12.3607c0-3.3842,0-6.5781.0387-9.43L1.2581,23.6932.1543,22.5151,21.1829,1.7512c-2.8517.0387-6.0456.0387-9.3911.0387H.1543L1.5616.3068Z"/></svg></a></span>`
    });

    eleventyConfig.addPassthroughCopy("./js");
    eleventyConfig.addPassthroughCopy("./*.xml");
    eleventyConfig.addPassthroughCopy("./favicon.ico");
    eleventyConfig.addPassthroughCopy("./assets");
    eleventyConfig.addWatchTarget("./scss/");
};