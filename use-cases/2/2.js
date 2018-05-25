async function manipulateUsers() {
    const users = getUsersFromDatabase(); // Note, no await
    for (const users of user) {
        doManipulation(user);
    }
}