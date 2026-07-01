const Method = {
    GET: "get",
    POST: "post",
    PATCH: "patch",
    PUT: "put",
    DELETE: "delete"
} as const;

type Method = typeof Method[keyof typeof Method];

export default Method;