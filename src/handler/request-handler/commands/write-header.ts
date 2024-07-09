import { ServerResponse } from "http"
import { Buffer } from "http://deno.land/x/node_buffer@1.1.0/mod.ts";

export function writeHeader(
    header: Buffer[],
    res: ServerResponse
) {
    const headerLines = Buffer.concat(header)
        .toString()
        .split('\r\n')
    for (let headerLine of headerLines) {
        const headerSplit = headerLine.split(':')
        const headerKey = headerSplit[0]
        const headerVal = headerSplit[1]
        res.setHeader(
            headerKey,
            headerVal
        )
    }
}
