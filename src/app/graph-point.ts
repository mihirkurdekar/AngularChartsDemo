export class GraphPoint {

    private _x: string;
    public get X(): string {
        return this._x;
    }
    public set X(v: string) {
        this._x = v;
    }

    private _y: number;
    public get Y(): number {
        return this._y;
    }
    public set Y(v: number) {
        this._y = v;
    }


    constructor(x: string, y: number) {
        this._x = x;
        this._y = y
    }

}
