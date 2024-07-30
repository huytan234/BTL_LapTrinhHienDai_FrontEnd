export const UserReducer = (current, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "update":
            return{
                ...current,
                ...action.payload
            }
        case "logout":
            return null;
    }
    return current;
}