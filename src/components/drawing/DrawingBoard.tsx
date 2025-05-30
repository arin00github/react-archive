"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SettingModal from "./SettingModal";

const StyledDrawingSetting = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(3);

  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 800;
    canvas.height = 600;
    // canvas 위에 그림을 그릴 수 있게 해주는 도구 세트를 반환
    // 프로그래밍에서 **"컨텍스트(context)"**라는 말은 **"작업을 수행할 수 있는 환경/상태/도구 모음"**을 의미해.
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  const saveState = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev, imageData]);
  };

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    saveState();
    if (!ctxRef.current) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctxRef.current) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!ctxRef.current) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;
    saveState();
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || undoStack.length < 2) return;

    const newUndoStack = [...undoStack];
    const lastState = newUndoStack.pop()!;
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(newUndoStack);
    setRedoStack((prev) => [...prev, currentState]);
    ctx.putImageData(lastState, 0, 0);
  };

  const redo = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || redoStack.length === 0) return;

    const newRedoStack = [...redoStack];
    const nextState = newRedoStack.pop()!;
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);

    setRedoStack(newRedoStack);
    setUndoStack((prev) => [...prev, currentState]);

    ctx.putImageData(nextState, 0, 0);
  };

  const downloadImage = (val: {
    fileName: string;
    fileType: string;
    bgColor: string;
  }) => {
    const { fileName, fileType, bgColor } = val;
    const canvas = canvasRef.current;
    if (!canvas) return;

    //NOTE - 임시 캔버스 생성. 진짜 그림이 바뀌는 것을 방지
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return;

    //NOTE - 배경설정
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    ctx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

    // 이미지 생성
    const mimeType = fileType === "jpeg" ? "image/jpeg" : "image/png";
    const image = tempCanvas.toDataURL(mimeType);
    const extension = fileType === "jpeg" ? ".jpg" : ".png";
    const safeName = fileName.trim() || "drawing";
    const fileNameVal = safeName.endsWith(extension)
      ? safeName
      : safeName + extension;

    // 다운로드
    const link = document.createElement("a");
    link.href = image;
    link.download = fileNameVal;
    link.click();

    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <SettingModal
        isOpen={modalOpen}
        handleClose={closeModal}
        handleSave={downloadImage}
      />
      <StyledDrawingSetting>
        <div>
          <label htmlFor="setting-line-color">Color</label>
          <input
            type="color"
            id="setting-line-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="setting-line-width">Width</label>
          <input
            type="range"
            id="setting-line-width"
            min={1}
            max={20}
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
        </div>
        <button onClick={clearCanvas}>Reset</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={() => setModalOpen(true)}>Download</button>
      </StyledDrawingSetting>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
        onMouseUp={stopDrawing}
        style={{ border: "1px solid #000" }}
      ></canvas>
    </div>
  );
};

export default DrawingBoard;
