import dotenv from "dotenv";

dotenv.config();

export default abstract class URLService {

    private static readonly _baseURL = process.env.BASE_URL!
    
    public static get baseURL(): string {
        
        return this._baseURL;
    
    };

    public static url(path: string): string {
        
        return `${this._baseURL}/${path}`;
    
    };

};