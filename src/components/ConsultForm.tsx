"use client";

import { useState } from "react";
import { consult } from "@/content";

type Status = { type: "idle" | "sending" | "success" | "error"; message?: string };

const field =
  "mt-2 block w-full rounded-md border border-navy/15 bg-white px-4 py-3 text-base text-navy placeholder:text-muted/70 focus:border-navy focus:outline-none";

export default function ConsultForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.type === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          grade: fd.get("grade"),
          subjects: fd.getAll("subjects"),
          message: fd.get("message"),
          agree: fd.get("agree") === "on",
          website: fd.get("website"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error);
      form.reset();
      setStatus({ type: "success", message: "상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다." });
    } catch (err) {
      setStatus({
        type: "error",
        message: (err as Error).message || "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      });
    }
  }

  const sending = status.type === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-7 text-left">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="t-label block text-navy">
          학부모 성함 <span className="font-normal text-muted">(필수)</span>
          <input name="name" required maxLength={30} autoComplete="name" className={field} />
        </label>
        <label className="t-label block text-navy">
          연락처 <span className="font-normal text-muted">(필수)</span>
          <input
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="010-0000-0000"
            pattern="[0-9\-\s+]{9,20}"
            className={field}
          />
        </label>
      </div>

      <label className="t-label block text-navy">
        학생 학년 <span className="font-normal text-muted">(선택)</span>
        <select name="grade" defaultValue="" className={field}>
          <option value="">선택해 주세요</option>
          {consult.grades.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className="t-label text-navy">
          희망 과목 <span className="font-normal text-muted">(복수 선택 가능)</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-x-7 gap-y-3">
          {consult.subjects.map((s) => (
            <label key={s} className="t-body flex cursor-pointer items-center gap-2.5">
              <input type="checkbox" name="subjects" value={s} className="h-5 w-5 accent-[#2b3346]" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="t-label block text-navy">
        문의 내용
        <textarea
          name="message"
          rows={5}
          maxLength={1000}
          placeholder="현재 학습 상황이나 궁금하신 점을 적어 주세요."
          className={`${field} resize-y`}
        />
      </label>

      {/* 스팸 방지용 숨김 필드 */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="border-t border-navy/10 pt-7">
        <p className="t-label">개인정보 수집·이용 동의 (필수)</p>
        <dl className="t-small mt-3 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-muted">
          <dt>수집 항목</dt>
          <dd>성함, 연락처, 학년</dd>
          <dt>이용 목적</dt>
          <dd>상담 안내</dd>
          <dt>보유 기간</dt>
          <dd>상담 완료 후 1년</dd>
        </dl>
        <label className="t-body mt-5 flex cursor-pointer items-start gap-2.5">
          <input type="checkbox" name="agree" required className="mt-1 h-5 w-5 shrink-0 accent-[#2b3346]" />
          위 내용을 확인했으며, 개인정보 수집·이용에 동의합니다.
        </label>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="h-13 w-full rounded-md bg-navy text-base font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-60 sm:w-auto sm:px-14"
      >
        {sending ? "보내는 중…" : "상담 신청하기"}
      </button>

      <p role="status" aria-live="polite" className={`t-body ${status.type === "error" ? "text-[#b3261e]" : "text-navy"}`}>
        {status.message}
      </p>
      <p className="t-small text-muted">{consult.notice}</p>
    </form>
  );
}
