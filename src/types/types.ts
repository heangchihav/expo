// types.ts
export interface User {
    name: string | undefined;
    email: string| undefined;
    avatarUri: string| undefined;
}

export interface UserProfileProps {
    user: User;
    onPress: () => void;
    visible:any
}
