"use client";

import React from "react";
import styles from "./index.module.scss";
import cx from "clsx";
import { useRouter } from "next/navigation";
import { httpPost } from "@/utils/http";
import { serializeError } from "serialize-error";
import {
  Params$UpdateTicket,
  Result$UpdateTicket,
} from "@/app/api/UpdateTicket/typing";
import { Ticket } from "@/typing";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  initialTicket: Ticket;
};

export default function PageAnswer({ className, style, initialTicket }: Props) {
  const router = useRouter();

  const [busy, setBusy] = React.useState(false);
  const [answer, setAnswer] = React.useState(initialTicket.answer || "");
  const [published, setPublished] = React.useState(initialTicket.published);

  const handleSubmit = async () => {
    setBusy(true);
    try {
      const data = await httpPost("/api/UpdateTicket", {
        createdAt: initialTicket.createdAt,
        answer,
        published,
      } satisfies Params$UpdateTicket).then(Result$UpdateTicket.parse);
      alert(
        [
          "✅ Lưu câu trả lời thành công",
          new Date(data.modifiedAt).toString(),
        ].join("\n\n")
      );
      router.refresh();
    } catch (error) {
      alert(JSON.stringify(serializeError(error), null, 2));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className={cx(styles.container, className)} style={style}>
      <h1>{"Trả lời"}</h1>
      <pre>{initialTicket.question}</pre>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <fieldset>
          <textarea
            disabled={busy}
            rows={10}
            name="question"
            placeholder="Câu trả lời"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <span>{"Công khai"}</span>
          </label>
        </fieldset>
        <input type="submit" value="Lưu câu trả lời" disabled={!answer} />
      </form>
    </main>
  );
}
