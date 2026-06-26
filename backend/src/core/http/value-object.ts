export abstract class ValueObject<T> {
    
    protected constructor(
        protected readonly value: T
    ) {};

    public get(): T {
        
        return this.value;
    
    };

};