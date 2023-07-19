async function onListen({ port, hostname }) {
    try {
        console.log(`Server started at http://${hostname}:${port}`);
    } catch (error) {
        console.error(error.message || error.toString());
        throw error;

    }
}

export { onListen }