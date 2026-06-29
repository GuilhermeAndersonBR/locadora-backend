const UserRole = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT"
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];

export default UserRole;