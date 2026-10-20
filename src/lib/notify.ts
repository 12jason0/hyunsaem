import nodemailer from "nodemailer";

// 상담 신청 알림: 텔레그램 + 이메일(Gmail) 동시 전송. 하나라도 성공하면 접수 성공으로 봄.
export type ConsultRequest = {
  name: string;
  phone: string;
  grade: string;
  subjects: string[];
  message: string;
};

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID 가 설정되지 않았습니다.");
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
}

async function sendEmail(subject: string, text: string) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!user || !pass || !to) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD / NOTIFY_EMAIL_TO 가 설정되지 않았습니다.");
  const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  await transport.sendMail({ from: `현샘영수 홈페이지 <${user}>`, to, subject, text });
}

// 숫자만 뽑아 하이픈 형식으로 (010-0000-0000, 02-000-0000 등). 맞는 형식이 없으면 숫자 그대로.
export function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("02")) return d.replace(/^(02)(\d{3,4})(\d{4})$/, "$1-$2-$3");
  return d.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
}

// 한국 시간. 예: 2026.10.20 (화) 15:59
export function formatKST(date: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(date)
      .map((x) => [x.type, x.value]),
  );
  return `${p.year}.${p.month}.${p.day} (${p.weekday}) ${p.hour}:${p.minute}`;
}

export async function sendConsultNotification(c: ConsultRequest): Promise<void> {
  const lines = [
    `성함: ${c.name}`,
    `연락처: ${formatPhone(c.phone)}`,
    `학년: ${c.grade || "미선택"}`,
    `희망 과목: ${c.subjects.join(", ") || "미선택"}`,
    `문의 내용:\n${c.message || "-"}`,
    `접수 시각: ${formatKST(new Date())}`,
  ].join("\n");

  const results = await Promise.allSettled([
    sendTelegram(`[현샘영수] 새 상담 신청\n${lines}`),
    sendEmail(`[현샘영수] 새 상담 신청 - ${c.name}`, lines),
  ]);
  const failed = results.filter((r) => r.status === "rejected").map((r) => (r as PromiseRejectedResult).reason);
  failed.forEach((e) => console.error(e));
  if (failed.length === results.length) throw new Error("텔레그램·이메일 알림 모두 실패했습니다.");
}
