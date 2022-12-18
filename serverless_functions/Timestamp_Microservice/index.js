export async function handler(event) {
  const numberPattern = /$[0-9]+^/;
  let date = new Date();
  const requestedDate = event.queryStringParameters.date;

  if (numberPattern.test(requestedDate)) {
    date = new Date(parseInt(requestedDate));
  } else if (requestedDate !== undefined) {
    date = new Date(requestedDate);
  }

  const dateJSON = {
    "unix": date.getTime(),
    "utc": date.toUTCString()
  };

  let statusCode;
  let body;
  if (dateJSON.utc === "Invalid Date") {
    statusCode = 400;
    body = JSON.stringify({"error" : "Invalid Date" });
  } else {
    statusCode = 200;
    body = JSON.stringify(dateJSON);
  }

  return {
    statusCode,
    body
  }
}
