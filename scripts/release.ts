import prompts from "prompts";
import fs from "node:fs";
import path from "node:path";
import c from "picocolors";
import spawn from "cross-spawn";
import * as semver from "semver";

const configPath = path.join(__dirname, "../package.json");
async function confirm() {
  return new Promise(async (resolve, reject) => {
    try {
      const { yes = false } = await prompts({
        name: "yes",
        type: "confirm",
        message: "confirm bump?",
        initial: true,
      });
      return resolve(yes);
    } catch (e) {
      console.log(c.red(`error: ${e}`));
      reject(false);
    }
  });
}
async function release() {
  const choices = Array.from(
    [
      "patch",
      "minor",
      "major",
      // "prerelease",
      // "prepatch",
      // "preminor",
      // "premajor",
      "custom",
    ],
    (title) => ({
      title,
      value: title,
    })
  );

  const { releaseType } = await prompts({
    type: "select",
    name: "releaseType",
    message: "Select release type",
    choices,
  });

  const pkg = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  let { version: currentVersion } = pkg;
  let targetVersion = "";
  if (releaseType === "custom") {
    targetVersion = await prompts({
      type: "text",
      name: "version",
      message: "Input release version: ",
    }).version;
    console.log(
      c.blue(`You are setting up a new version is : ${targetVersion}`)
    );
  } else {
    targetVersion = semver.inc(
      currentVersion,
      releaseType as semver.ReleaseType
    );
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }

  if (!(await confirm())) process.exit(0);
  console.log(c.blue(`Now, your new version is : ${targetVersion}`));
  currentVersion = targetVersion;

  fs.writeFileSync(configPath, JSON.stringify(pkg, null, 2));

  spawn.sync("pnpm", ["build"], {
    stdio: "inherit",
  });
  spawn.sync("git", ["add", "-A"], { stdio: "inhert" });
  spawn.sync("git", ["commit", "-m", `chore: release: v${targetVersion}`], {
    stdio: "inhert",
  });
  spawn.sync("git", ["push", "origin"], { stdio: "inherit" });
  if (
    spawn.sync("pnpm", ["publish", "--registry=https://registry.npmjs.org"], {
      stdio: "inherit",
    }).status === 1
  ) {
    // 恢复版本号
    pkg.version = currentVersion;
    fs.writeFileSync(configPath, JSON.stringify(pkg, null, 2));
    throw new Error(`invalid publish version: ${targetVersion}`);
  }
}

try {
  release();
} catch (e) {
  console.error(e);
}
