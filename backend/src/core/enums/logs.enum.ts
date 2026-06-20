const Logs = {
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR"
} as const;

type Logs = typeof Logs[keyof typeof Logs];

export default Logs;
