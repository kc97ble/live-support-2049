import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { Ticket } from "@/typing";

function getDbPath() {
  return z.string().parse(process.env.DB_PATH);
}

export function isAdminFingerprint(fingerprint: string) {
  return process.env.ADMIN_FINGERPRINT === fingerprint;
}

export async function getTickets({
  fingerprint,
}: {
  fingerprint: string | null | undefined;
}): Promise<Ticket[]> {
  const dbPath = getDbPath();
  const names = await fs.readdir(dbPath);
  const results = await Promise.allSettled(
    names.map(async (name) => {
      const text = await fs.readFile(path.join(dbPath, name), "utf-8");
      const data = Ticket.parse(JSON.parse(text));
      return data;
    })
  );
  const tickets = results.flatMap((res) => {
    if (res.status !== "fulfilled") return [];
    if (res.value.published) return [res.value];
    if (fingerprint && isAdminFingerprint(fingerprint)) return [res.value];
    if (res.value.fingerprint === fingerprint) return [res.value];
    return [];
  });
  return tickets.sort((a, b) => b.createdAt - a.createdAt);
}

export async function createTicket({
  fingerprint,
  question,
}: {
  fingerprint: string;
  question: string;
}) {
  const now = Date.now();
  const ticket: Ticket = {
    fingerprint,
    question,
    answer: null,
    published: false,
    createdAt: now,
  };

  await fs.writeFile(
    path.join(getDbPath(), `${now}.json`),
    JSON.stringify(ticket, null, 2)
  );

  return now;
}

export async function getTicket(createdAt: number) {
  const text = await fs.readFile(
    path.join(getDbPath(), `${createdAt}.json`),
    "utf-8"
  );
  return Ticket.parse(JSON.parse(text));
}

export async function updateTicket(
  createdAt: number,
  updates: Partial<Ticket>
) {
  const ticket = await getTicket(createdAt);
  if (updates.fingerprint !== undefined) {
    ticket.fingerprint = updates.fingerprint;
  }
  if (updates.question !== undefined) {
    ticket.question = updates.question;
  }
  if (updates.answer !== undefined) {
    ticket.answer = updates.answer;
  }
  if (updates.published !== undefined) {
    ticket.published = updates.published;
  }

  await fs.writeFile(
    path.join(getDbPath(), `${createdAt}.json`),
    JSON.stringify(ticket, null, 2)
  );

  return Date.now();
}
