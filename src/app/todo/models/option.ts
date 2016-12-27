export class Option {

    public type:string;
    public volatility:number;
    public r:number;
    public S0:number;
    public K:number;
    public N:number;

    constructor(type:string, volatility:number, r:number, S0:number,K:number) {
        this.type = type;
        this.volatility = volatility;
        this.r = r;
        this.S0 = S0;
        this.K = K;
        this.N = 50;
    }


}