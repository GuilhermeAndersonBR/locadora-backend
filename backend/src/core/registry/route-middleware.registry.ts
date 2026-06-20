interface RouteMiddlewareMetadata {
    target: Function;
    methodName: string,
    transformer?: any;
    validator?: any;
};

export default class RouteMiddlewareRegistry {

    private static readonly routes: Array<
        RouteMiddlewareMetadata
    > = [];

    public static register(
        metadata: RouteMiddlewareMetadata
    ): void {

        this.routes.push(metadata);

    };    

    public static registerTransformer(
        target: Function,
        methodName: string,
        transformer: any
    ): void {

        let route = this.routes.find(
            route =>
                route.target === target &&
                route.methodName === methodName
        );

        if (!route) {

            route = {
                target,
                methodName
            };

            this.routes.push(route);
        
        };

        route.transformer = transformer;

    };

    public static get(
        target: Function,
        methodName: string
    ): RouteMiddlewareMetadata | undefined {

        return this.routes.find(
            route => 
                route.target === target && 
                route.methodName === methodName
        );

    };

};