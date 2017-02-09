import { Option } from "./option";
export class BSPrice {

    public o:Option;

    constructor(opt:Option) {
        this.o = opt;
    }


    d1(S0:number, K:number, r:number, sigma:number, T:number) {
        var part1 = (Math.log(S0/K) + (r + (sigma*sigma) / 2)* T);
        var part2 = sigma * Math.sqrt(T);
        return part1/part2;
    }

    d2(S0:number, K:number, r:number, sigma:number, T:number) {
        var part1 = (Math.log(S0/K) + (r - (sigma*sigma) / 2) * T);
        var part2 = sigma * Math.sqrt(T);
        return  part1/part2; 
    }

    EuropeanCall(S0:number, K:number, r:number, sigma:number, T:number) {
        var res = S0 * math.erf(this.d1(S0, K, r, sigma, T)) - K * math.exp(-r * T) * math.erf(this.d2(S0, K, r, sigma, T));
        return res;
    }
    
    // BlackScholes(type,S0, K, r, sigma, T):
    // if type=="C":
        
    // else:
    //    return K * np.exp(-r * T) * ss.norm.cdf(-d2(S0, K, r, sigma, T)) - S0 * ss.norm.cdf(-d1(S0, K, r, sigma, T))
}

