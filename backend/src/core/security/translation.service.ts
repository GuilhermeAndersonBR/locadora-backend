import ptBr from "../../i18n/pt-BR.json" with { type: "json"};
import enUs from "../../i18n/en-US.json" with { type: "json"};
export default class TranslationService {
    
    private static readonly translations = {
        "pt-BR": ptBr,
        "en-US": enUs
    };

    public static translate(
        key: string, 
        language: string
    ): string {
        
        const locale = this.translations[
            language as keyof typeof this.translations
        ] ?? this.translations["en-US"];

        return locale[
            key as keyof typeof locale
        ] ?? key;

    };

};