export class ChartData {
   
    
    private _data : number;
    private _date : Date;


    public get date(): Date {
        return this._date;
    }
    public set date(v: Date) {
        this._date = v }
    


    public get data() : number {
        return this._data;
    }
    public set data(v : number) {
        this._data = v;
    }
    
 
    constructor(date:Date,data:number) {
        this._date=date;
        this._data=data;
    }
}
