export default function stringToJSON(str) {
    return JSON.parse(
        str
            .replace("ObjectId('", '"')
            .replace("')", '"')
            .replace(/'/g, '"')
            .replace(/\n/g, '')
    );
}
