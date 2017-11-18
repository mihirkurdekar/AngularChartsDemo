import { Component, OnInit, OnChanges, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { GraphPoint } from '../graph-point';
import { Dot } from '../dot';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-line-graph',
    templateUrl: './line-graph.component.html',
    styleUrls: ['./line-graph.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineGraphComponent implements OnInit, OnChanges {

    constructor() { }

    graph: HTMLCanvasElement;
    xPadding = 30;
    yPadding = 30;
    dots: Array<Dot>;

    @Input('graph-data')
    data: Array<GraphPoint>;


    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data']) {
            this.draw();
        }
    }

    // Returns the max Y value in our data list
    getMaxY(): number {
        let max = 0;

        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].Y > max) {
                max = this.data[i].Y;
            }
        }

        max += 10 - max % 10;
        return max + 50;
    }

    // Return the x pixel for a graph point
    getXPixel(val: number) {
        // return ((this.graph.width - this.xPadding) / (this.getMaxX())) * val + (this.xPadding * 1.5);
        return ((this.graph.width - this.xPadding) / this.data.length) * val + this.xPadding;
    }

    // Return the y pixel for a graph point
    getYPixel(val: number) {
        return this.graph.height - (((this.graph.height - this.yPadding) / this.getMaxY()) * val) - this.yPadding;
    }

    draw(): void {
        if (this.data !== null && this.data !== undefined && this.data.length > 0) {
            this.graph = <HTMLCanvasElement>document.querySelector('#graph');
            const c = this.graph.getContext('2d');
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
            // const inc = (this.data.length > 1500) ? 600 : 60;
            // interval between text on X axis
            let interval = 6;
            if (this.data.length < 100) {
                interval = 10;
            } else if (this.data.length < 1000) {
                interval *= 10;
            } else if (this.data.length < 10000) {
                interval *= 100;
            } else {
                interval *= 1000;
            }
            for (let i = 0; i < this.data.length; i += interval) {
                c.fillText(this.data[i].X.substr(11, 17), this.getXPixel(i), this.graph.height - this.yPadding + 20);
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
            c.moveTo(this.getXPixel(0), this.getYPixel(this.data[0].Y));
            /*for (let i = 1; i < this.data.length; i++) {
                c.lineTo(this.getXPixel(i), this.getYPixel(this.data[i].Y));
            }
            c.stroke(); */

            for (let i = 0; i < this.data.length - 1; i ++) {
                // curved points till midpoint so missing actual points
                /* const xc = (this.getXPixel(i) + this.getXPixel(i + 1)) / 2;
                const yc = (this.getYPixel(this.data[i].Y) + this.getYPixel(this.data[i + 1].Y)) / 2;
               c.quadraticCurveTo(this.getXPixel(i), this.getYPixel(this.data[i].Y), xc, yc); */
               c.quadraticCurveTo(this.getXPixel(i), this.getYPixel(this.data[i].Y),
                this.getXPixel(i + 1), this.getYPixel(this.data[i + 1].Y));
            }
          // curve through the last two points

          c.stroke();

            // Draw the dots
            c.fillStyle = '#333';
            this.dots = [];
            for (let i = 0; i < this.data.length; i++) {
                const x = this.getXPixel(i);
                const y = this.getYPixel(this.data[i].Y);
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
            const tipCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector('#tip');
            const tipCtx = tipCanvas.getContext('2d');
            const mouseX = event.clientX - this.graph.getBoundingClientRect().left;
            const mouseY = event.clientY - this.graph.getBoundingClientRect().top;
            // console.log("x:"+mouseX+"y:"+mouseY);


            let hit = false;
            if (this.dots !== undefined && this.dots.length > 0) {
                for (let i = 0; i < this.dots.length; i++) {
                    const dot = this.dots[i];
                    const dx = mouseX - dot.x;
                    const dy = mouseY - dot.y;

                    if (dx * dx + dy * dy < 16) {
                        tipCanvas.style.left = (dot.x) + 'px';
                        tipCanvas.style.top = (dot.y) - 40 + 'px';
                        tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
                        // tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
                        tipCtx.fillText(this.dots[i].text, 5, 15);
                        hit = true;
                        break;
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
