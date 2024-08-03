"use client";

import React from "react";
import styles from "./index.module.scss";
import cx from "clsx";
import useSWR from "swr";
import { httpGet } from "@/utils/http";
import { Result$GetTickets } from "@/app/api/GetTickets/typing";
import { Result$GetFingerprint } from "@/app/api/GetFingerprint/typing";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export default function PageTickets({ className, style }: Props) {
  const swr_GetTickets = useSWR("/api/GetTickets", (url) =>
    httpGet(url, { cache: "no-cache" }).then(Result$GetTickets.parse)
  );
  const tickets = swr_GetTickets.data?.tickets;

  const swr_GetFingerprint = useSWR("/api/GetFingerprint", (url) =>
    httpGet(url, { cache: "no-cache" }).then(Result$GetFingerprint.parse)
  );
  const fingerprint = swr_GetFingerprint.data?.fingerprint;
  const isAdmin = swr_GetFingerprint.data?.isAdmin;

  return (
    <main className={cx(styles.container, className)} style={style}>
      {tickets?.map((t) => (
        <article key={t.createdAt}>
          <header>
            {isAdmin ? (
              <a href={`/a/${t.createdAt}`}>
                {new Date(t.createdAt).toString()}
              </a>
            ) : (
              <span>{new Date(t.createdAt).toString()}</span>
            )}
          </header>
          {t.question ? <pre>{t.question}</pre> : undefined}
          {t.question && t.answer ? <hr /> : undefined}
          {t.answer ? <pre>{t.answer}</pre> : undefined}
          {fingerprint && fingerprint === t.fingerprint ? (
            <footer>
              {t.published ? (
                <span>{"🌐 Câu hỏi của bạn đã được công khai."}</span>
              ) : (
                <span>{"🔒 Chỉ mình bạn nhìn thấy câu hỏi này."}</span>
              )}
            </footer>
          ) : undefined}
        </article>
      ))}
    </main>
  );
}
