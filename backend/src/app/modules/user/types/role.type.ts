const Role = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT"
} as const;

type Role = typeof Role[keyof typeof Role];

export default Role;