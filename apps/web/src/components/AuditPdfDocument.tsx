"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { AuditReport, AuditIssue } from "@/lib/api";

interface Props {
  businessName: string;
  report: AuditReport;
}

const colors = {
  red: "#EF4444",
  green: "#22C55E",
  accent: "#2563EB",
  text: "#111827",
  muted: "#6B7280",
  bg: "#FFFFFF",
  surface: "#F9FAFB",
  border: "#E5E7EB",
  criticalDot: "#EF4444",
  majorDot: "#F59E0B",
  minorDot: "#9CA3AF",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.text,
    padding: 40,
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: colors.text,
  },
  headerSub: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 2,
  },
  headerDate: {
    fontSize: 9,
    color: colors.muted,
  },
  scoreRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  scoreBox: {
    flex: 1,
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  scoreBoxRed: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  scoreBoxGreen: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  scoreLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  scoreLabelRed: {
    color: colors.red,
  },
  scoreLabelGreen: {
    color: colors.green,
  },
  scoreNumber: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
  },
  scoreNumberRed: {
    color: colors.red,
  },
  scoreNumberGreen: {
    color: colors.green,
  },
  scoreUnit: {
    fontSize: 10,
    color: colors.muted,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: colors.text,
    marginBottom: 8,
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  issueRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 2,
    marginRight: 8,
    flexShrink: 0,
  },
  issueContent: {
    flex: 1,
  },
  issueTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.text,
    marginBottom: 2,
  },
  issueDesc: {
    fontSize: 8.5,
    color: colors.muted,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  issueFixed: {
    fontSize: 8,
    color: colors.green,
  },
  strengthRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  strengthDot: {
    fontSize: 10,
    color: colors.green,
    marginRight: 6,
  },
  strengthText: {
    fontSize: 9,
    color: colors.text,
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 8,
    color: colors.muted,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  summaryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  summaryChipText: {
    fontSize: 9,
    color: colors.muted,
  },
});

function severityDotColor(severity: AuditIssue["severity"]): string {
  if (severity === "critical") return colors.criticalDot;
  if (severity === "major") return colors.majorDot;
  return colors.minorDot;
}

export function AuditPdfDocument({ businessName, report }: Props) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const criticals = report.issues.filter((i) => i.severity === "critical").length;
  const majors = report.issues.filter((i) => i.severity === "major").length;
  const minors = report.issues.filter((i) => i.severity === "minor").length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Website-Analyse</Text>
            <Text style={styles.headerSub}>{businessName}</Text>
          </View>
          <Text style={styles.headerDate}>{dateStr}</Text>
        </View>

        {/* Score row */}
        <View style={styles.scoreRow}>
          <View style={[styles.scoreBox, styles.scoreBoxRed]}>
            <Text style={[styles.scoreLabel, styles.scoreLabelRed]}>
              Aktuelle Website
            </Text>
            <Text style={[styles.scoreNumber, styles.scoreNumberRed]}>
              {report.score}
            </Text>
            <Text style={styles.scoreUnit}>/100 Punkte</Text>
          </View>
          <View style={[styles.scoreBox, styles.scoreBoxGreen]}>
            <Text style={[styles.scoreLabel, styles.scoreLabelGreen]}>
              Neue Website
            </Text>
            <Text style={[styles.scoreNumber, styles.scoreNumberGreen]}>
              {report.newScore}
            </Text>
            <Text style={styles.scoreUnit}>/100 Punkte</Text>
          </View>
        </View>

        {/* Summary chips */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryChip}>
            <View style={[styles.dot, { backgroundColor: colors.criticalDot }]} />
            <Text style={styles.summaryChipText}>{criticals} kritisch</Text>
          </View>
          <View style={styles.summaryChip}>
            <View style={[styles.dot, { backgroundColor: colors.majorDot }]} />
            <Text style={styles.summaryChipText}>{majors} major</Text>
          </View>
          <View style={styles.summaryChip}>
            <View style={[styles.dot, { backgroundColor: colors.minorDot }]} />
            <Text style={styles.summaryChipText}>{minors} minor</Text>
          </View>
        </View>

        {/* Issues */}
        <Text style={styles.sectionTitle}>
          Gefundene Probleme — alle in der neuen Website behoben
        </Text>
        {report.issues.map((issue) => (
          <View key={issue.id} style={styles.issueRow}>
            <View
              style={[
                styles.dot,
                { backgroundColor: severityDotColor(issue.severity) },
              ]}
            />
            <View style={styles.issueContent}>
              <Text style={styles.issueTitle}>{issue.title}</Text>
              <Text style={styles.issueDesc}>{issue.description}</Text>
              <Text style={styles.issueFixed}>✓ {issue.fixedIn}</Text>
            </View>
          </View>
        ))}

        {/* Strengths */}
        {report.strengths.length > 0 && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Stärken der aktuellen Website</Text>
            {report.strengths.map((s, i) => (
              <View key={i} style={styles.strengthRow}>
                <Text style={styles.strengthDot}>○</Text>
                <Text style={styles.strengthText}>{s}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Erstellt mit Website Engine</Text>
          <Text style={styles.footerText}>{dateStr}</Text>
        </View>
      </Page>
    </Document>
  );
}
