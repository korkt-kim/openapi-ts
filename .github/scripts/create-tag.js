/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

function createTags(directories) {
  const dirs = Array.isArray(directories)
    ? directories
    : directories.split(',').map(dir => dir.trim())

  try {
    dirs.forEach(packagesDir => {
      const packages = fs
        .readdirSync(packagesDir)
        .filter(f => fs.statSync(path.join(packagesDir, f)).isDirectory())

      if (packages.length === 0) {
        console.error(`No packages found in ${packagesDir} directory`)
        process.exit(1)
      }

      packages.forEach(pkg => {
        try {
          const packageJsonPath = path.join(
            process.cwd(),
            packagesDir,
            pkg,
            'package.json'
          )

          const { name, version } = require(packageJsonPath)
          const tagName = `${name.replace('@zakelstorm/openapi-ts', '')}@${version}`
          console.log(`git tag ${tagName}`)
          console.log(`git push origin ${tagName}`)
        } catch (err) {
          console.error(`Error processing package ${pkg}:`, err.message)
        }
      })
    })
  } catch (err) {
    console.error('Failed to create tags:', err.message)
    process.exit(1)
  }
}

// CI 환경에서 실행할 때
if (process.env.CI) {
  // 환경 변수에서 디렉토리 목록을 가져옵니다
  const directories = process.env.PACKAGE_DIRECTORIES
  if (!directories) {
    console.error('PACKAGE_DIRECTORIES environment variable is not set')
    process.exit(1)
  }
  createTags(directories)
}
