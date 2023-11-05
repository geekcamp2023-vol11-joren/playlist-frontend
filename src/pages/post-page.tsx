import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { TailSpin } from "solid-spinner";

import type { SupportedSites } from "../@types/playlist";
import { PlayerWrapper } from "../components/VideoPlayer.tsx";
import Styles from "./post-page.module.scss";

export const PostPage: Component<{ path?: RegExpMatchArray }> = (params) => {
  const roomId = params.path?.groups?.roomId;
  const [url, setUrl] = createSignal<string>("");

  const [loading, setLoading] = createSignal(false);
  const [previewUrl, setPreviewUrl] = createSignal<
    { type: SupportedSites; url: string } | undefined
  >(undefined);

  // 動画URLをidに変換する
  const urlToId = (
    url: string,
  ):
    | {
        type: SupportedSites;
        url: string;
      }
    | undefined => {
    const urlObj = new URL(url);
    if (urlObj.hostname.match(/youtube\.com|youtu\.be/)) {
      const searchParams = urlObj.searchParams;
      const id = searchParams.get("v");
      if (!id) {
        return {
          type: "youtube",
          url: url,
        };
      }
      return {
        type: "youtube",
        url: id,
      };
    }
    if (urlObj.hostname.match(/nicovideo\.jp/)) {
      const path = urlObj.pathname;
      const id = path.split("/").pop();
      if (!id) {
        return {
          type: "nicovideo",
          url: url,
        };
      }
      return {
        type: "nicovideo",
        url: id,
      };
    }
  };

  const addMovieHandler = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = urlToId(url());
      if (!data) return;
      const res = await fetch(
        `https://joren-playlist-backend.deno.dev/api/v1/room/${roomId}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // データはJSON形式で送信
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        throw new Error(`HTTPエラーコード: ${res.status}`);
      }

      // ここで成功時の処理を追加する
      setUrl("");
    } catch (error) {
      // エラーハンドリング
      console.error("エラーが発生しました:", error);
      // エラーメッセージを表示するなど、必要な処理を追加できます
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class={Styles.wrapper}>
      <div class={Styles.main}>
        <h1>動画投稿</h1>
        <div class={Styles.inputRow}>
          <input
            type="text"
            name="url"
            placeholder="動画のURLを入力してください"
            value={url()}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => setPreviewUrl(urlToId(url()))}
            class={Styles.input}
            disabled={loading()}
          />
          <button
            class={Styles.inputButton}
            onClick={() => void addMovieHandler()}
            disabled={loading()}
          >
            {loading() && <TailSpin class={Styles.loading} />}
            <span class={Styles.text}>投稿</span>
          </button>
        </div>
        {previewUrl() && (
          <PlayerWrapper
            autoPlay={false}
            _index={0}
            _increment={0}
            url={{
              item: {
                ...previewUrl()!,
                metadata: { title: "", channel: "", thumbnail: "" },
              },
              increment: 0,
              index: 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
