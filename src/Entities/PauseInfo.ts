import { Canvas } from "../Core/Canvas";

export class PauseInfo {

    // The goal is to render a mario like paused UI in the center with a semi transparent bg
    display(canvas: Canvas, message: string) {
        //Render the BG
        canvas.ctx.save();
        canvas.ctx.fillStyle = 'rgba(0 , 0 , 0 , 0.74)';
        canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas.ctx.restore();

        // Render the text
        canvas.ctx.save();
        canvas.ctx.fillStyle = 'white';
        const textWidth = canvas.ctx.measureText(message);
        canvas.ctx.fillText(message, (canvas.width / 2) - (textWidth.width / 2), (canvas.height / 2), textWidth.width);
        canvas.ctx.restore();
    }
}
