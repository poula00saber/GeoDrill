import type { Lang } from "@/lib/content";

export type FaqItem = { q: string; a: string };

/**
 * Frequently asked questions shown on the home slider (`FaqSlider`) and the
 * full accordion page (`/faq`). Keep entries factual and specific to
 * GEODRILL's services — no invented numbers.
 */
export const FAQS: Record<Lang, FaqItem[]> = {
  en: [
    {
      q: "What services does GEODRILL provide?",
      a: "We deliver general contracting, infrastructure, concrete, steel structures, MEP, finishing, and insulation works.",
    },
    {
      q: "Do you work with government and private clients?",
      a: "Yes. Our teams support government entities, developers, consultants, and private organizations across Saudi Arabia.",
    },
    {
      q: "How do I request a quotation?",
      a: "Share your project scope through our contact form and our team will review it and get back to you.",
    },
    {
      q: "Where does GEODRILL operate?",
      a: "We serve projects across the Kingdom, with capabilities suited to both urban and remote sites.",
    },
    {
      q: "Do you carry out geotechnical investigation?",
      a: "Yes. We perform soil investigation, structural assessment, shoring and piling design, and soil improvement.",
    },
    {
      q: "What certifications does GEODRILL hold?",
      a: "We are ISO 9001, ISO 45001, and ISO 14001 certified for quality, occupational health & safety, and environment.",
    },
    {
      q: "How do I track progress during my project?",
      a: "You receive clear updates at each stage so you stay informed from excavation through finishing and handover.",
    },
  ],
  ar: [
    {
      q: "ما الخدمات التي تقدمها جيو دريل؟",
      a: "نقدم أعمال التعاقد العام والبنية التحتية وأعمال التربة والهياكل المعدنية والأعمال الكهروميكانيكية والتشطيبات والعزل.",
    },
    {
      q: "هل تعملون مع الجهات الحكومية والخاصة؟",
      a: "نعم، ندعم الجهات الحكومية والمطورين والاستشاريين والمؤسسات الخاصة في جميع أنحاء المملكة العربية السعودية.",
    },
    {
      q: "كيف أطلب عرضًا سعريًا؟",
      a: "شاركنا نطاق مشروعك عبر نموذج التواصل وسيراجعه فريقنا ويتواصل معك قريبًا.",
    },
    {
      q: "أين تعمل جيو دريل؟",
      a: "نخدم المشاريع في جميع أنحاء المملكة، بقدرات تناسب المواقع الحضرية والنائية.",
    },
    {
      q: "هل تقومون بأعمال الفحص الجيوتقني؟",
      a: "نعم، نقدم استكشاف التربة والتقييم الإنشائي وتصميم أعمال التدعيم والخوازيق وتحسين التربة.",
    },
    {
      q: "ما الشهادات التي تحملها جيو دريل؟",
      a: "نحن معتمدون بشهادات آيزو 9001 وآيزو 45001 وآيزو 14001 في الجودة والصحة المهنية والبيئة.",
    },
    {
      q: "كيف أتابع سير العمل خلال المشروع؟",
      a: "تصلنا تحديثات واضحة في كل مرحلة لتبقى على اطلاع من البداية حتى التشطيب والتسليم.",
    },
  ],
};