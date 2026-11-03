import Image from "next/image";
import ConsultForm from "@/components/ConsultForm";
import Header from "@/components/Header";
import HeroPhoto from "@/components/HeroPhoto";
import Reveal from "@/components/Reveal";
import Tabs from "@/components/Tabs";
import { admissions, care, coaching, consult, english, englishPrograms, englishSpecial, faq, feedbackSamples, fees, footer, hero, math, photos, site, statements, teacher, timetable, type Course } from "@/content";

const btn = "inline-flex h-14 items-center justify-center rounded-md px-8 text-base font-semibold transition-colors";
const grades = ["초등부", "중등부", "고등부"];
const scheduleOf = (list: Course[], grade: string) => list.find((c) => c.tab === grade)?.schedule;

// "A · B" 형식이면 모바일에서는 두 줄로
function Sched({ text }: { text?: string }) {
  if (!text) return <span className="text-muted">—</span>;
  const [a, b] = text.split(" · ");
  return (
    <>
      <span className="block sm:inline">{a}</span>
      {b && <span className="block sm:inline sm:before:content-['_·_']">{b}</span>}
    </>
  );
}

function Head({ title, sub }: { title: string; sub?: string }) {
  return (
    <div data-reveal className="mx-auto mb-8 max-w-2xl text-center lg:mb-12">
      <h2 className="t-title text-navy">{title}</h2>
      {sub && <p className="t-body mt-4">{sub}</p>}
    </div>
  );
}

type Box = { label: string; title: string; items: (string | { name: string; desc: string })[]; note: string; cta: string };

function SpecialBox({ box }: { box: Box }) {
  if (box.items.length === 0) return null;
  return (
    <div data-reveal className="mt-12 rounded-md border border-gold bg-ivory px-6 py-7 lg:mt-16 lg:flex lg:items-center lg:gap-10 lg:px-10 lg:py-9">
      <div className="lg:flex-1">
        <p className="t-label text-muted">{box.label}</p>
        <h3 className="t-sub mt-1.5 text-navy">{box.title}</h3>
        <ol className="mt-5 divide-y divide-navy/10 lg:grid lg:auto-cols-fr lg:grid-flow-col lg:divide-x lg:divide-y-0">
          {box.items.map((item, i) => {
            const name = typeof item === "string" ? item : item.name;
            return (
              <li key={name} className="flex gap-3 py-3.5 first:pt-0 last:pb-0 lg:px-6 lg:py-0 lg:first:pl-0 lg:last:pr-0">
                <span className="t-small font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="t-body block font-medium text-balance text-navy">{name}</span>
                  {typeof item !== "string" && <span className="t-small mt-1 block text-muted">{item.desc}</span>}
                </span>
              </li>
            );
          })}
        </ol>
        {box.note && <p className="t-small mt-6 text-muted">{box.note}</p>}
      </div>
      <a href="#consult-form" className="t-small mt-6 inline-block shrink-0 font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy lg:mt-0">
        {box.cta} →
      </a>
    </div>
  );
}

// 섹션 사이 쉬어가는 큰 문장 (명조, 글자만)
function Statement({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p data-reveal className={`t-statement whitespace-pre-line text-navy ${className}`}>
      {text}
    </p>
  );
}

function CoursePanel({ c }: { c: Course }) {
  return (
    <div className="pt-8">
      <p className="t-small text-muted">
        {c.name} · {c.tagline}
      </p>
      <h3 className="t-sub mt-2 text-navy">{c.title}</h3>
      <div className="t-body mt-6 max-w-3xl space-y-4">
        {c.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}

function KakaoButton({ className = "" }: { className?: string }) {
  return (
    <a href={site.kakaoUrl} target="_blank" rel="noopener noreferrer" className={`${btn} bg-kakao text-[#191919] hover:bg-[#f5dc00] ${className}`}>
      카카오톡 상담
    </a>
  );
}

export default function Home() {
  const footerInfo = [
    footer.businessName && `상호: ${footer.businessName}`,
    footer.owner && `대표자: ${footer.owner}`,
    footer.bizNo && `사업자등록번호: ${footer.bizNo}`,
    footer.registrationNo && `개인과외교습자 신고번호: ${footer.registrationNo}`,
  ].filter(Boolean) as string[];

  return (
    <>
      <Reveal />
      <Header />

      <main id="top">
        {/* 메인: 가운데 정렬 글 + 큰 사진 + 떠 있는 배지 */}
        <section className="bg-[#f7f6f3] pt-14 pb-20 lg:pt-24 lg:pb-28">
          <div className="wrap text-center">
            <p className="text-[0.9375rem] text-navy/60">{hero.eyebrow}</p>
            <h1 className="mt-4 text-[2rem] leading-[1.2] font-bold tracking-[-0.03em] text-balance text-navy lg:mt-5 lg:text-[3.5rem]">
              {hero.title[0]}
              <br className="hidden sm:inline" /> {hero.title[1]}
            </h1>
            <div className="mx-auto mt-5 max-w-2xl text-[0.9375rem] leading-[1.7] text-balance text-body lg:mt-6 lg:text-[1.0625rem]">
              {hero.description.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <a
              href="#consult-form"
              className="mt-9 inline-flex items-center justify-center rounded-full bg-navy px-8 py-4 text-base font-semibold text-ivory shadow-[0_8px_24px_rgba(43,51,70,0.25)] transition-colors hover:bg-navy-deep lg:mt-10"
            >
              {hero.cta}
            </a>

            {hero.photos.length > 0 && (
              <div className="relative mx-auto mt-12 max-w-[1080px] lg:mt-16">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy/5 lg:aspect-video">
                  <HeroPhoto photos={hero.photos} />
                </div>
                {/* 사진 왼쪽 아래 배지: PC는 사진 밖으로 살짝 걸치고, 모바일은 사진 안쪽 */}
                <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-xl bg-white py-2.5 pr-4 pl-2.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)] lg:-bottom-7 lg:left-10 lg:gap-4 lg:py-4 lg:pr-6 lg:pl-4">
                  <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3e9d2] text-navy lg:h-10 lg:w-10">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" />
                    </svg>
                  </span>
                  <span>
                    <span className="t-label block text-muted">{hero.badge.label}</span>
                    <span className="block text-[0.8125rem] font-semibold text-navy lg:text-[0.9375rem]">{hero.badge.text}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 원장 소개: 왼쪽 사진 / 오른쪽 경력·지도 정보 */}
        <section id="teacher" className="border-y border-navy/[0.06] bg-tint">
          <div className="wrap section">
            <div data-reveal className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
              <h2 className="t-title text-navy">{teacher.title}</h2>
            </div>

            <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div data-reveal className="relative mx-auto w-full max-w-sm lg:max-w-md">
                {/* 원장님 사진이 없으면 네이비 바탕 + HS 모노그램 */}
                <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-navy shadow-[0_30px_60px_-25px_rgba(43,51,70,0.45)] ${teacher.photo ? "aspect-[4/5]" : "aspect-[4/3] lg:aspect-[4/5]"}`}>
                  {teacher.photo ? (
                    <Image src={teacher.photo} alt={`${teacher.role} ${teacher.name}`.trim()} fill sizes="(min-width: 1024px) 448px, 384px" className="object-cover" />
                  ) : (
                    <Image src="/monogram.png" alt="" width={265} height={323} className="w-[22%] opacity-90 lg:w-[34%]" />
                  )}
                </div>
                {teacher.badge.value && (
                  <div className="absolute right-4 -bottom-4 rounded-lg bg-white px-4 py-2.5 shadow-[0_10px_24px_-10px_rgba(43,51,70,0.35)] ring-1 ring-navy/5">
                    <p className="t-label text-muted">{teacher.badge.label}</p>
                    <p className="t-small font-semibold text-navy">{teacher.badge.value}</p>
                  </div>
                )}
              </div>

              <div data-reveal>
                <p className="t-small font-semibold text-navy">
                  {teacher.role} {teacher.name}
                </p>

                <div className="mt-4 rounded-lg border-l-[3px] border-accent bg-white px-6 py-6 sm:px-8 sm:py-7">
                  {teacher.quote && <p className="t-body mb-4 text-navy">“{teacher.quote}”</p>}
                  <p className="t-sub text-navy">{teacher.intro}</p>
                  <div className="mt-6 divide-y divide-gold/30 border-t border-gold/30">
                    {teacher.body.map(({ label, strong, text }) => {
                      const [before, ...rest] = text.split(strong);
                      return (
                        <div key={label} className="py-6 last:pb-0">
                          <p className="t-label text-accent">{label}</p>
                          <p className="t-body mt-2 leading-[1.85] break-keep">
                            {rest.length ? (
                              <>
                                {before}
                                <strong className="font-semibold text-navy">{strong}</strong>
                                {rest.join(strong)}
                              </>
                            ) : (
                              text
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {teacher.careers.length > 0 && (
                  <ul className="t-body mt-7 space-y-3">
                    {teacher.careers.map((c) => (
                      <li key={c} className="flex items-center gap-3 font-medium text-navy">
                        <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {admissions.groups.length > 0 && (
              <div data-reveal className="mt-16 rounded-lg bg-white px-6 py-7 lg:mt-20 lg:px-10 lg:py-9">
                <h3 className="t-sub text-navy">{admissions.title}</h3>
                {admissions.period && <p className="t-small mt-1 text-muted">{admissions.period}</p>}
                <ul className="mt-6 divide-y divide-navy/10 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                  {admissions.groups.map((g) => (
                    <li key={g.label} className="py-5 first:pt-0 last:pb-0 lg:px-8 lg:py-0 lg:first:pl-0 lg:last:pr-0">
                      <p className="t-small font-semibold text-navy">
                        {g.label} <span className="ml-1 font-normal text-muted">{g.verb}</span>
                      </p>
                      <p className="t-body mt-2 text-ink">
                        {g.schools.join(", ")} <span className="t-label text-muted">등</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {photos.length > 0 && (
              <div data-reveal className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
                {photos.map((ph) => (
                  <div key={ph.src} className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 수업 대상 및 시간 */}
        <section id="schedule">
          <div className="wrap section">
            <Head title={timetable.title} sub={timetable.note} />
            <div data-reveal>
              <table className="t-body w-full table-fixed text-left">
                <thead className="t-label text-muted">
                  <tr className="border-b border-navy/15">
                    <th scope="col" className="w-[26%] pb-3 font-medium">구분</th>
                    <th scope="col" className="pb-3 font-medium">영어</th>
                    <th scope="col" className="pb-3 font-medium">수학</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((g) => (
                    <tr key={g} className="border-b border-navy/10">
                      <th scope="row" className="py-4 pr-3 font-semibold text-navy">
                        {g}
                      </th>
                      <td className="py-4 pr-3">
                        <Sched text={scheduleOf(english, g)} />
                      </td>
                      <td className="py-4">
                        <Sched text={scheduleOf(math, g)} />
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-navy/10">
                    <th scope="row" className="py-4 pr-3 align-top font-semibold text-navy">
                      탐구 코칭
                    </th>
                    {/* 영어·수학 두 칸을 합친 한 칸 */}
                    <td colSpan={2} className="py-4">
                      {coaching.schedule} <span className="whitespace-nowrap">({coaching.target.replace(/\s/g, "")})</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 교습비 */}
            <div data-reveal className="mt-14">
              <h3 className="t-label mb-4 font-semibold text-navy">{fees.title}</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[20rem] text-left text-[0.9rem] sm:text-base">
                  <thead className="t-label text-muted">
                    <tr className="border-b border-navy/15">
                      <th scope="col" className="w-[30%] pb-3 pr-2 font-medium">과목</th>
                      <th scope="col" className="pb-3 pr-2 font-medium">학년</th>
                      <th scope="col" className="pb-3 pr-2 font-medium">수업</th>
                      <th scope="col" className="pb-3 text-right font-medium">월 교습비</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.rows.map((r, i) => {
                      const first = i === 0 || fees.rows[i - 1].subject !== r.subject;
                      const span = first ? fees.rows.slice(i).findIndex((x) => x.subject !== r.subject) : 0;
                      return (
                        <tr key={i} className="border-b border-navy/10">
                          {first && (
                            <th scope="rowgroup" rowSpan={span === -1 ? fees.rows.length - i : span} className="border-r border-navy/10 py-3 pr-2 align-top font-semibold text-navy [word-break:keep-all]">
                              {r.subject}
                            </th>
                          )}
                          <td className="whitespace-nowrap py-3 pl-2 pr-2 sm:pl-4">{r.grade}</td>
                          <td className="py-3 pr-2 [word-break:keep-all]">{r.lesson}</td>
                          <td className="whitespace-nowrap py-3 text-right font-semibold text-navy">{r.fee}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-muted sm:text-sm">{fees.note}</p>
            </div>
          </div>
        </section>

        {/* 영어 */}
        <section id="english" className="border-y border-navy/[0.06] bg-tint">
          <div className="wrap section">
            <Head title="영어 수업" />
            <div data-reveal>
              {/* 특별 과정: 학년 탭마다 다른 내용 */}
              <Tabs
                label="영어 수업 학년"
                tabs={english.map((c) => {
                  const special = englishSpecial.byTab[c.tab];
                  return {
                    id: c.id,
                    label: c.tab,
                    content: (
                      <>
                        <CoursePanel c={c} />
                        {special && <SpecialBox box={{ ...englishSpecial, ...special }} />}
                      </>
                    ),
                  };
                })}
              />
            </div>

            {/* 영어 프로그램: 탭과 상관없이 항상 표시 */}
            <SpecialBox box={englishPrograms} />
          </div>
        </section>

        {/* 수학 */}
        <section id="math">
          <div className="wrap section">
            <Head title="수학 수업" />
            <div data-reveal>
              <Tabs label="수학 수업 학년" tabs={math.map((c) => ({ id: c.id, label: c.tab, content: <CoursePanel c={c} /> }))} />
            </div>
          </div>
        </section>

        {/* 학습 관리 */}
        <section id="care" className="border-y border-navy/[0.06] bg-tint">
          <div className="wrap section">
            <Head title={care.title} />
            {/* 벤토 그리드: "매 수업 후 학부모 피드백"(care.featured)을 2×2 큰 칸으로 */}
            <ol className="grid gap-3 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
              {/* 큰 칸을 맨 앞으로 두고 화면 순서대로 01~04 */}
              {[care.items[care.featured], ...care.items.filter((_, j) => j !== care.featured)].map((item, i, list) => {
                const big = i === 0;
                return (
                  <li
                    key={item.title}
                    data-reveal
                    className={
                      big
                        ? "flex min-h-60 flex-col justify-center gap-6 rounded-md bg-navy p-7 text-ivory lg:col-span-2 lg:row-span-2 lg:min-h-[26rem] lg:p-10"
                        : `flex flex-col rounded-md border border-navy/12 bg-ivory p-6 lg:p-7 ${i === list.length - 1 ? "lg:col-span-2" : ""}`
                    }
                  >
                    <span className={`t-small font-semibold ${big ? "text-ivory/50" : "text-navy/35"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <div className={big ? "" : "mt-6"}>
                      <h3 className={big ? "t-title" : "t-sub text-navy"}>{item.title}</h3>
                      <p className={`t-body mt-3 ${big ? "max-w-md text-ivory/80" : ""}`}>{item.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* 피드백 예시: feedbackSamples 가 비어 있으면 보이지 않음 */}
            {feedbackSamples.length > 0 && (
              <div data-reveal className="mx-auto mt-16 max-w-xl">
                <h3 className="t-sub text-center text-navy">수업 후 피드백 예시</h3>
                <div className="mt-6 space-y-3 rounded-md bg-[#b2c7da] p-4 sm:p-6">
                  {feedbackSamples.map((m, i) =>
                    m.from === "teacher" ? (
                      <div key={i} className="flex justify-end">
                        <p className="t-small max-w-[80%] rounded-2xl rounded-tr-sm bg-kakao px-4 py-3 whitespace-pre-line text-[#191919]">{m.text}</p>
                      </div>
                    ) : (
                      <div key={i} className="max-w-[80%]">
                        {m.label && <p className="t-label mb-1 text-navy/70">{m.label}</p>}
                        <p className="t-small rounded-2xl rounded-tl-sm bg-white px-4 py-3 whitespace-pre-line text-[#191919]">{m.text}</p>
                      </div>
                    ),
                  )}
                </div>
                <p className="t-label mt-3 text-center text-muted">학부모님 동의를 받아 이름 등 개인정보를 가리고 게재했습니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* 탐구 코칭 */}
        <section id="coaching">
          <div className="wrap section">
          <Head title={coaching.title} />
          <div data-reveal>
            <dl className="grid grid-cols-2 rounded-md bg-tint py-5 text-center">
              {[
                ["대상", coaching.target],
                ["수업 횟수", coaching.schedule],
              ].map(([k, v]) => (
                <div key={k} className="px-2 [&+&]:border-l [&+&]:border-navy/10">
                  <dt className="t-label text-muted">{k}</dt>
                  <dd className="t-sub mt-1 text-navy">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="t-body mt-8 max-w-3xl space-y-3">
              {coaching.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="t-body mt-8 grid gap-x-8 sm:grid-cols-2">
              {coaching.topics.map((t, i) => (
                <li key={t} className="flex gap-4 border-b border-navy/10 py-3.5">
                  <span className="font-semibold text-navy/35">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-navy">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <Statement text={statements.coaching} className="mt-20 lg:mt-32" />
          </div>
        </section>

        {/* 자주 묻는 질문 */}
        <section id="faq" className="border-y border-navy/[0.06] bg-tint">
          <div className="wrap section">
            <Head title="자주 묻는 질문" />
            <div data-reveal className="border-t border-navy/15">
              {faq.map((f) => (
                <details key={f.q} className="faq border-b border-navy/10">
                  <summary className="t-sub flex items-center justify-between gap-6 py-5 text-navy">{f.q}</summary>
                  <p className="t-body -mt-1 pb-6 pr-8">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 상담 */}
        <section id="consult" className="wrap section">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <h2 className="t-title text-navy">{consult.title}</h2>
            <p className="t-body mt-5">{consult.body}</p>
            <p className="t-body mt-2 text-navy">{consult.kakaoGuide}</p>
            <KakaoButton className="mt-9 w-full sm:w-auto sm:px-14" />
            <p className="t-small mt-4 text-muted">{consult.kakaoTip}</p>
          </div>
          <div id="consult-form" data-reveal className="mt-10 rounded-xl bg-tint px-5 py-8 sm:px-10 lg:py-12">
            <div className="mx-auto max-w-2xl">
              <h3 className="t-sub mb-8 text-navy">상담 신청서</h3>
              <ConsultForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-navy/[0.08] bg-tint pb-20 lg:pb-0">
        <div className="wrap t-small flex flex-col gap-6 py-14 text-muted sm:flex-row sm:items-start sm:justify-between">
          <Image src="/logo-header.png" alt="현샘영수" width={901} height={300} className="h-9 w-auto self-start" />
          <div className="space-y-1.5 sm:text-right">
            <p>{footer.location}</p>
            {footerInfo.length > 0 && <p>{footerInfo.join(" · ")}</p>}
            <p>
              <a href={site.kakaoUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-navy">
                카카오톡 채널
              </a>
            </p>
          </div>
        </div>
        <p className="wrap t-small border-t border-navy/[0.08] py-6 text-muted">
          © {new Date().getFullYear()} {footer.copyright}
        </p>
      </footer>

      {/* PC 우측 하단 카카오톡 버튼 */}
      <a
        href={site.kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="t-small fixed right-6 bottom-6 z-40 hidden h-12 items-center rounded-full bg-kakao px-5 font-semibold text-[#191919] ring-1 ring-black/5 transition-colors hover:bg-[#f5dc00] lg:inline-flex"
      >
        카카오톡 상담
      </a>

      {/* 모바일 하단 고정 바 */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 bg-navy pb-[env(safe-area-inset-bottom)] lg:hidden">
        <a href={site.kakaoUrl} target="_blank" rel="noopener noreferrer" className="flex h-14 items-center justify-center bg-kakao text-base font-semibold text-[#191919]">
          카카오톡 상담
        </a>
        <a href="#consult" className="flex h-14 items-center justify-center text-base font-semibold text-white">
          상담 신청
        </a>
      </div>
    </>
  );
}
