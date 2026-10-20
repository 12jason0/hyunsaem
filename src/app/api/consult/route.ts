import { NextResponse } from "next/server";
import { consult } from "@/content";
import { sendConsultNotification } from "@/lib/notify";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// ponytail: 서버리스라 IP 기반 요청 제한은 없음. 스팸이 실제로 늘면 Vercel Firewall 규칙 추가.
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data || typeof data !== "object") return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });

  // honeypot: 사람에게는 보이지 않는 필드. 값이 있으면 봇으로 보고 성공처럼 응답.
  if (str(data.website, 200)) return NextResponse.json({ ok: true });

  const name = str(data.name, 30);
  const phone = str(data.phone, 20);
  const grade = consult.grades.includes(data.grade) ? data.grade : "";
  const subjects = Array.isArray(data.subjects) ? consult.subjects.filter((s) => data.subjects.includes(s)) : [];
  const message = str(data.message, 1000);

  if (!name) return NextResponse.json({ error: "학부모 성함을 입력해 주세요." }, { status: 400 });
  if (!/^[0-9\-\s+]{9,20}$/.test(phone) || phone.replace(/\D/g, "").length < 9)
    return NextResponse.json({ error: "연락처를 정확히 입력해 주세요." }, { status: 400 });
  if (data.agree !== true) return NextResponse.json({ error: "개인정보 수집·이용에 동의해 주세요." }, { status: 400 });

  try {
    await sendConsultNotification({ name, phone, grade, subjects, message });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "전송에 실패했습니다. 잠시 후 다시 시도하시거나 카카오톡으로 문의해 주세요." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
