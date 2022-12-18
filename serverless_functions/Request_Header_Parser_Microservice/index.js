export async function handler(event) {
    const xForwardedFor = event.headers["x-forwarded-for"];
    const acceptLanguage = event.headers["accept-language"];
    const userAgent = event.headers["user-agent"];
    const responseJSON = {};
    if (xForwardedFor) {
        responseJSON.ipaddress = xForwardedFor.split(",")[0];
    }
    if (acceptLanguage) {
        responseJSON.language = acceptLanguage.split(",")[0];
    }
    if (userAgent) {
        responseJSON.software = userAgent.split("(")[1].split(")")[0];
    }

    return {
        statusCode: 200,
        body: JSON.stringify(responseJSON)
    }
}
