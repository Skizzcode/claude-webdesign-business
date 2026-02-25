import "dotenv/config";
import { exportProject } from "../services/exporter";

async function main() {
  // Parse --id flag
  const args = process.argv.slice(2);
  let projectId: string | undefined;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--id" && args[i + 1]) projectId = args[++i];
    else if (!args[i].startsWith("--")) projectId = args[i];
  }

  if (!projectId) {
    console.error("Usage: npm run export -- --id <projectId>");
    process.exit(1);
  }

  console.log(`\nExporting project: ${projectId}\n`);

  const exportDir = await exportProject({
    projectId,
    onProgress: (msg) => console.log(`  ${msg}`),
  });

  console.log(`\n✓ Export complete!`);
  console.log(`  Output: ${exportDir}`);
  console.log(`\n  To run the exported site:`);
  console.log(`    cd ${exportDir}`);
  console.log(`    npm install`);
  console.log(`    npm run build`);
  console.log(`    npm start\n`);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
