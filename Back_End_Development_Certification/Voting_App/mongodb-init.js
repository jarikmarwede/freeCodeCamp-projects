db.createUser(
    {
        user: "user",
        pwd: "nopass",
        roles: [
            {
                role: "readWrite",
                db: "voting-app",
            }
        ]
    }
)
