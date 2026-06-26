export default abstract class RentalCalc {

    public static calculate(
        start_date: Date,
        expected_return_date: Date,
        daily_price_cents: number
    ): number {

        const ms =
            expected_return_date.getTime() - 
            start_date.getTime();

        const days =
            Math.ceil(ms / (1000 * 60 * 60 * 24));

        return days * daily_price_cents;

    };

};