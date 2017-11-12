export class Dot {


    private _x: number;
    public get x(): number {
        return this._x;
    }
    public set x(v: number) {
        this._x = v;
    }

    private _y: number;
    public get y(): number {
        return this._y;
    }
    public set y(v: number) {
        this._y = v;
    }


    private _text: string;
    public get text(): string {
        return this._text;
    }
    public set text(v: string) {
        this._text = v;
    }


    constructor(x: number, y: number, text: string) {
        this._x = x;
        this._y = y;
        this._text = text;
    }

}
