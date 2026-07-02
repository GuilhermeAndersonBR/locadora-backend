import { i18n } from "@/main";

export default abstract class TranslationService {
    
    public static getLocale(): string {
        
        const { locale } = i18n.global;

        return locale.value;
    
    };

    public static translate(
        key: string
    ): string {

        const globalI18n = i18n.global;

        return globalI18n.t(key).toString();

    };

};