import { Component, OnInit, OnChanges, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { GraphPoint } from '../graph-point';
import { Dot } from '../dot';

@Component({
    selector: 'line-graph',
    templateUrl: './line-graph.component.html',
    styleUrls: ['./line-graph.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineGraphComponent implements OnInit, OnChanges {

    constructor() { }

    graph: HTMLCanvasElement;
    xPadding = 30;
    yPadding = 20;
    dots: Array<Dot>;

    @Input('graph-data')
    data: Array<GraphPoint>;


    ngOnInit() {
    }

    ngOnChanges() {
        this.draw();
    }

    getMaxX() {
        let max = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (parseInt(this.data[i].X, 10) > max) {
                max = parseInt(this.data[i].X, 10);
            }
        }
        return max;
    }

    // Returns the max Y value in our data list
    getMaxY() {
        let max = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].Y > max) {
                max = this.data[i].Y;
            }
        }

        max += 10 - max % 10;
        return max;
    }

    // Return the x pixel for a graph point
    getXPixel(val) {
        // return ((this.graph.width - this.xPadding) / (this.getMaxX())) * val + (this.xPadding * 1.5);
        return ((this.graph.width - this.xPadding) / this.data.length) * val + this.xPadding;
    }

    // Return the y pixel for a graph point
    getYPixel(val) {
        return this.graph.height - (((this.graph.height - this.yPadding) / this.getMaxY()) * val) - this.yPadding;
    }

    draw(): void {
        if (this.data !== null && this.data !== undefined && this.data.length > 0) {
            this.graph = <HTMLCanvasElement>document.querySelector('#graph');
            let c = this.graph.getContext('2d');
            // clear earlier graph
            c.clearRect(0, 0, this.graph.width, this.graph.height);


            c.lineWidth = 2;
            c.strokeStyle = '#333';
            c.font = 'italic 8pt sans-serif';
            c.textAlign = 'center';

            // Draw the axises
            c.beginPath();
            c.moveTo(this.xPadding, 0);
            c.lineTo(this.xPadding, this.graph.height - this.yPadding);
            c.lineTo(this.graph.width, this.graph.height - this.yPadding);
            c.stroke();

            // Draw the X value texts
            for (let i = 0; i < this.data.length; i += 60) {
                c.fillText(this.data[i].X.substr(11, 19), this.getXPixel(i), this.graph.height - this.yPadding + 20);
            }


            // Draw the Y value texts
            c.textAlign = 'right';
            c.textBaseline = 'middle';

            for (let i = 0; i < this.getMaxY(); i += 100) {
                c.fillText(i + '', this.xPadding - 10, this.getYPixel(i));
            }

            c.strokeStyle = '#c8d2d7';

            // Draw the line graph
            c.beginPath();
            c.moveTo(this.getXPixel(this.data[0].X), this.getYPixel(this.data[0].Y));
            for (let i = 1; i < this.data.length; i++) {
                c.lineTo(this.getXPixel(i), this.getYPixel(this.data[i].Y));
            }
            c.stroke();

            // Draw the dots
            c.fillStyle = '#333';
            this.dots = [];
            for (let i = 0; i < this.data.length; i++) {
                let x = this.getXPixel(i);
                let y = this.getYPixel(this.data[i].Y);
                c.beginPath();
                c.arc(x, y, 4, 0, Math.PI * 2, true);
                c.fill();
                this.dots.push(new Dot(x, y, this.data[i].X + ' , ' + this.data[i].Y));
            }
            // console.log(this.dots);
        }
    }

    mouseMoveEvent(event: MouseEvent): void {
        if (this.graph !== undefined && this.graph != null) {
            let tipCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#tip');
            let tipCtx = tipCanvas.getContext('2d');
            let mouseX = event.clientX - this.graph.getBoundingClientRect().left;
            let mouseY = event.clientY - this.graph.getBoundingClientRect().top;
            // console.log("x:"+mouseX+"y:"+mouseY);


            let hit = false;
            if (this.dots !== undefined && this.dots.length > 0) {
                for (let i = 0; i < this.dots.length; i++) {
                    let dot = this.dots[i];
                    let dx = mouseX - dot.x;
                    let dy = mouseY - dot.y;

                    if (dx * dx + dy * dy < 16) {
                        tipCanvas.style.left = (dot.x) + 'px';
                        tipCanvas.style.top = (dot.y) - 40 + 'px';
                        tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
                        // tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
                        tipCtx.fillText(this.dots[i].text, 5, 15);
                        hit = true;
                        // console.log("hit");
                    }
                }
            }

            if (!hit) {
                tipCanvas.style.left = '-400px';
            }

        }

    }

}
