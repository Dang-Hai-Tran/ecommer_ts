import mongoose from "mongoose";

function countConnections() {
    const numConnections = mongoose.connections.length;
    console.log(`Number of connections to mongodb:: ${numConnections}`);
}

export { countConnections };
