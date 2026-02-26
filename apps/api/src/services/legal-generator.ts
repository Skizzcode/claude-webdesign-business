import { v4 } from "@website-engine/core";
import type { Page, Meta } from "@website-engine/core";

/**
 * Generates Impressum + Datenschutz legal pages from business meta.
 * Template-based (no LLM) for reliability and legal accuracy.
 * Includes auto-generated disclaimer as required by law.
 */
export function generateLegalPages(meta: Meta, language: "de" | "en"): Page[] {
  const disclaimer =
    language === "de"
      ? "Dieses Impressum wurde automatisch generiert. Bitte prüfen Sie alle Angaben sorgfältig und ergänzen Sie fehlende Pflichtangaben vor der Veröffentlichung."
      : "This legal notice was automatically generated. Please review all information carefully and add any missing required details before publishing.";

  const datenschutzDisclaimer =
    language === "de"
      ? "Diese Datenschutzerklärung wurde automatisch generiert. Bitte lassen Sie sie von einem Rechtsanwalt oder Datenschutzbeauftragten prüfen, bevor Sie sie veröffentlichen."
      : "This privacy policy was automatically generated. Please have it reviewed by a lawyer or data protection officer before publishing.";

  // ── Impressum ──────────────────────────────────────────

  const impressumItems =
    language === "de"
      ? [
          {
            icon: "Building2",
            title: "Angaben gemäß § 5 TMG",
            description: [
              meta.businessName,
              meta.address || "[Adresse einfügen]",
            ]
              .filter(Boolean)
              .join("\n"),
          },
          {
            icon: "Phone",
            title: "Kontakt",
            description: [
              meta.phone ? `Telefon: ${meta.phone}` : "Telefon: [Telefonnummer einfügen]",
              meta.email ? `E-Mail: ${meta.email}` : "E-Mail: [E-Mail-Adresse einfügen]",
            ].join("\n"),
          },
          {
            icon: "Shield",
            title: "Haftungsausschluss",
            description:
              "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.",
          },
          {
            icon: "ExternalLink",
            title: "Haftung für Links",
            description:
              "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
          },
          {
            icon: "FileText",
            title: "Urheberrecht",
            description:
              "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
          },
          {
            icon: "AlertCircle",
            title: "Hinweis",
            description: disclaimer,
          },
        ]
      : [
          {
            icon: "Building2",
            title: "Legal Notice",
            description: [
              meta.businessName,
              meta.address || "[Insert address]",
            ]
              .filter(Boolean)
              .join("\n"),
          },
          {
            icon: "Phone",
            title: "Contact",
            description: [
              meta.phone ? `Phone: ${meta.phone}` : "Phone: [Insert phone number]",
              meta.email ? `Email: ${meta.email}` : "Email: [Insert email address]",
            ].join("\n"),
          },
          {
            icon: "Shield",
            title: "Disclaimer",
            description:
              "The contents of this website have been prepared with the utmost care. However, we cannot guarantee the accuracy, completeness or topicality of the content.",
          },
          {
            icon: "AlertCircle",
            title: "Notice",
            description: disclaimer,
          },
        ];

  const impressumPage: Page = {
    id: v4(),
    slug: "impressum",
    title: language === "de" ? "Impressum" : "Legal Notice",
    navLabel: language === "de" ? "Impressum" : "Legal",
    showInNav: false,
    sections: [
      {
        id: v4(),
        type: "hero",
        visible: true,
        paddingTop: "md",
        paddingBottom: "md",
        background: "default",
        headline: language === "de" ? "Impressum" : "Legal Notice",
        subheadline:
          language === "de"
            ? "Angaben gemäß § 5 TMG"
            : "Information according to legal requirements",
        buttons: [],
        layout: "centered",
      },
      {
        id: v4(),
        type: "services",
        visible: true,
        paddingTop: "md",
        paddingBottom: "lg",
        background: "default",
        items: impressumItems,
        layout: "list",
      },
      {
        id: v4(),
        type: "footer",
        visible: true,
        paddingTop: "none",
        paddingBottom: "none",
        background: "default",
        columns: [],
        copyright: `© ${new Date().getFullYear()} ${meta.businessName}`,
        showSocials: false,
        showCredit: false,
      },
    ],
  };

  // ── Datenschutzerklärung ───────────────────────────────

  const datenschutzItems =
    language === "de"
      ? [
          {
            question: "1. Datenschutz auf einen Blick",
            answer:
              "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
          },
          {
            question: "2. Verantwortliche Stelle",
            answer: [
              `Verantwortlich für die Datenverarbeitung auf dieser Website ist:`,
              `${meta.businessName}`,
              meta.address || "[Adresse einfügen]",
              meta.email ? `E-Mail: ${meta.email}` : "",
              meta.phone ? `Telefon: ${meta.phone}` : "",
            ]
              .filter(Boolean)
              .join("\n"),
          },
          {
            question: "3. Datenerfassung auf dieser Website",
            answer:
              "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. durch das Kontaktformular).",
          },
          {
            question: "4. Kontaktformular",
            answer:
              "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.",
          },
          {
            question: "5. Hosting",
            answer:
              "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.",
          },
          {
            question: "6. Cookies",
            answer:
              "Diese Website verwendet nur technisch notwendige Cookies. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.",
          },
          {
            question: "7. Ihre Rechte",
            answer:
              "Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.",
          },
          {
            question: "Hinweis",
            answer: datenschutzDisclaimer,
          },
        ]
      : [
          {
            question: "1. Privacy at a Glance",
            answer:
              "The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data by which you can be personally identified.",
          },
          {
            question: "2. Data Controller",
            answer: [
              "The party responsible for data processing on this website is:",
              `${meta.businessName}`,
              meta.address || "[Insert address]",
              meta.email ? `Email: ${meta.email}` : "",
              meta.phone ? `Phone: ${meta.phone}` : "",
            ]
              .filter(Boolean)
              .join("\n"),
          },
          {
            question: "3. Data Collection",
            answer:
              "Data on this website is collected by the website operator. The operator's contact details are provided in the legal notice on this website. Some data is collected when you provide it to us (e.g. via the contact form).",
          },
          {
            question: "4. Your Rights",
            answer:
              "You have the right to receive information about the origin, recipient and purpose of your stored personal data at any time, free of charge. You also have a right to demand the correction or deletion of this data. You can contact us at any time regarding this matter.",
          },
          {
            question: "Notice",
            answer: datenschutzDisclaimer,
          },
        ];

  const datenschutzPage: Page = {
    id: v4(),
    slug: "datenschutz",
    title: language === "de" ? "Datenschutzerklärung" : "Privacy Policy",
    navLabel: language === "de" ? "Datenschutz" : "Privacy",
    showInNav: false,
    sections: [
      {
        id: v4(),
        type: "hero",
        visible: true,
        paddingTop: "md",
        paddingBottom: "md",
        background: "default",
        headline:
          language === "de" ? "Datenschutzerklärung" : "Privacy Policy",
        subheadline:
          language === "de"
            ? "Informationen gemäß DSGVO"
            : "Information pursuant to GDPR",
        buttons: [],
        layout: "centered",
      },
      {
        id: v4(),
        type: "faq",
        visible: true,
        paddingTop: "md",
        paddingBottom: "lg",
        background: "default",
        items: datenschutzItems,
      },
      {
        id: v4(),
        type: "footer",
        visible: true,
        paddingTop: "none",
        paddingBottom: "none",
        background: "default",
        columns: [],
        copyright: `© ${new Date().getFullYear()} ${meta.businessName}`,
        showSocials: false,
        showCredit: false,
      },
    ],
  };

  return [impressumPage, datenschutzPage];
}
