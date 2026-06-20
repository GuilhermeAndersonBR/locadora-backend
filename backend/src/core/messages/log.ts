import Logs from "../enums/logs.enum.js";

export default class Log {

    private static formatMessage(
        type: Logs, 
        template: string,
        messages: Array<unknown>
    ): string {

        const now: Date = new Date();

        const time24: string = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(now);

        const defaultLog = `\[${type}\]\:\[${time24}\]\:`;

        let returnMessage = `${defaultLog} ${template}.`;

        messages.forEach((message: unknown, index: number) => {
            
            returnMessage = 
                returnMessage.replace(
                    `\{${index}\}`,
                    String(message)
                );

        });

        return returnMessage;

    };

    public static info(
        template: string,
        ...messages: Array<unknown>
    ): void {

        console.info(this.formatMessage(
            Logs.INFO, 
            template, 
            messages
        ));
    
    };

    public static warn(
        template: string,
        ...messages: Array<unknown>
    ): void {

        console.warn(this.formatMessage(
            Logs.WARN, 
            template, 
            messages
        ));
    
    };

    public static error(
        template: string,
        ...messages: Array<unknown>
    ): void {

        console.error(this.formatMessage(
            Logs.ERROR, 
            template, 
            messages
        ));
    
    };

};