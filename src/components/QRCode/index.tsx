import QRCode from "qrcode";
import type { Component } from "solid-js";
import { onMount } from "solid-js";

import { CopyLink } from "./copyLink";

type Props = {
  roomId: string;
};

export const QrCode: Component<Props> = ({ roomId }) => {
  const endPoint = location.host;
  const postPageUrl = `${endPoint}/#/post/${roomId}/`;
  let canvasRef: HTMLCanvasElement | undefined = undefined;

  // QRコードを生成してキャンバスに描画する関数
  const generateQRCode = (postPageUrl: string): void => {
    if (canvasRef) {
      QRCode.toCanvas(canvasRef, postPageUrl, (error) => {
        if (error) {
          console.error("QR Code generation error:", error);
        }
      });
    }
  };

  // コンポーネントが初期化されたときにQRコードを生成
  onMount(() => {
    if (!canvasRef) return;
    generateQRCode(postPageUrl);
  });

  return (
    <div>
      <canvas ref={canvasRef} width="128" height="128"></canvas>
      <CopyLink url={postPageUrl} />
    </div>
  );
};
