import Busboy from "busboy";

// Taken from https://www.netlify.com/blog/2021/07/29/how-to-process-multipart-form-data-with-a-netlify-function/
function parseMultipartForm(event) {
    return new Promise((resolve) => {
        // we'll store all form fields inside of this
        const fields = {};

        // let's instantiate our busboy instance!
        const busboy = new Busboy({
            // it uses request headers
            // to extract the form boundary value (the ----WebKitFormBoundary thing)
            headers: event.headers
        });

        // before parsing anything, we need to set up some handlers.
        // whenever busboy comes across a file ...
        busboy.on(
            "file",
            (fieldname, filestream, filename, transferEncoding, mimeType) => {
                // ... we take a look at the file's data ...
                filestream.on("data", (data) => {
                    // ... and write the file's name, type and content into `fields`.
                    fields[fieldname] = {
                        filename,
                        type: mimeType,
                        content: data,
                    };
                });
            }
        );

        // whenever busboy comes across a normal field ...
        busboy.on("field", (fieldName, value) => {
            // ... we write its value into `fields`.
            fields[fieldName] = value;
        });

        // once busboy is finished, we resolve the promise with the resulted fields.
        busboy.on("finish", () => {
            resolve(fields)
        });

        // now that all handlers are set up, we can finally start processing our request!
        busboy.write(Buffer.from(event.body, "base64").toString("utf8"));
    });
}

export async function handler(event) {
    const fields = await parseMultipartForm(event);
    const uploadedFile = fields["upfile"];

    if (uploadedFile) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                "filename": uploadedFile["filename"],
                "size": uploadedFile["content"]["length"]
            })
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({
                "error": "File could not be parsed"
            })
        }
    }
}
