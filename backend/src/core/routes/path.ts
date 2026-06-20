export default class Path {

    private _value!: string;

    public constructor(value: string) {
        
        this.value = value;
    
    };

    public get value(): string {
        
        return this._value;
    
    };

    public set value(value: string) {
        
        value = value.startsWith("\/") 
            ? value 
            : `\/${value}`;

        this._value = value;
    
    };

};