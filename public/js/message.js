const getMessage = (username ,message) =>{
    return {
username,
message,
createdAt : new Date().getTime()
    }
}

