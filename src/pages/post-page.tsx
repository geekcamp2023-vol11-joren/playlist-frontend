import { createSignal } from "solid-js";

export const PostPage = () => {
  const [url, setUrl] = createSignal<string>("");

  const roomId = window.location.hash.replace("#", "");

  const addMovieHandler = async () => {
    try {
      const data = { url: url() };
      const res = await fetch(`https://joren-playlist-backend.deno.dev/api/v1/room/${roomId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // データはJSON形式で送信
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTPエラーコード: ${res.status}`);
      }

      // ここで成功時の処理を追加する
      setUrl("");
    } catch (error) {
      // エラーハンドリング
      console.error("エラーが発生しました:", error);
      // エラーメッセージを表示するなど、必要な処理を追加できます
    }
  };
  return (
    <div>
      <h1>動画投稿</h1>
      <input
        type="text"
        name="url"
        value={url()}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={() => addMovieHandler()}>投稿</button>
    </div>
  );
};