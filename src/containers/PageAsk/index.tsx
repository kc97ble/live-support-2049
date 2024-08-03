"use client";

import { httpGet, httpPost } from "@/utils/http";
import {
  Params$CreateTicket,
  Result$CreateTicket,
} from "@/app/api/CreateTicket/typing";
import { Result$GetFingerprint } from "@/app/api/GetFingerprint/typing";
import { serializeError } from "serialize-error";
import { useRouter } from "next/navigation";
import cx from "clsx";
import React from "react";
import styles from "./index.module.scss";
import useSWR from "swr";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function PageAsk({ className, style }: Props) {
  const router = useRouter();

  const swr_GetFingerprint = useSWR("/api/GetFingerprint", (url) =>
    httpGet(url, { cache: "no-cache" }).then(Result$GetFingerprint.parse)
  );
  const fingerprint = swr_GetFingerprint.data?.fingerprint;

  const [busy, setBusy] = React.useState(false);
  const [text, setText] = React.useState("");

  return (
    <main className={cx(styles.container, className)} style={style}>
      <h1>{"Đặt câu hỏi"}</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          try {
            const data = await httpPost("/api/CreateTicket", {
              question: text,
            } satisfies Params$CreateTicket).then(Result$CreateTicket.parse);
            alert(
              [
                "✅ Gửi câu hỏi thành công",
                new Date(data.createdAt).toString(),
              ].join("\n\n")
            );
            router.push("/t");
          } catch (error) {
            alert(JSON.stringify(serializeError(error), null, 2));
          } finally {
            setBusy(false);
          }
        }}
      >
        <fieldset>
          <textarea
            disabled={busy}
            rows={10}
            name="question"
            placeholder="Câu hỏi"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </fieldset>
        <input
          type="submit"
          value="Gửi câu hỏi"
          disabled={!fingerprint || !text}
        />
      </form>
    </main>
  );
}
