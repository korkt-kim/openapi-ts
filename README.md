# OPENAPI_TS

이 레포지토리는 OpenAPI 스펙으로부터 TypeScript 타입과 API 클라이언트를 자동으로 생성하는 도구입니다.

## Installation

1. project의 root 디렉토리에 .npmrc 추가

   ```
   @fdi:registry=https://nexus.hmc.co.kr/repository/npm-fdi
   ```

2. openapi-ts package 설치

   예)

   ```
   npm install @fdi/openapi-ts
   ```

## Rules

### Commit and Push

1. main 브랜치에서 뻗어나가는 새 브랜치를 생성한다.

2. 코드 변경사항을 적용하고 저장한다.

3. 해당 변경사항에 해당하는 changeset을 작성한다.

   ```
   pnpm changeset
   ```

4. Commit 후에 Merge Request를 생성한다.

### Publish

1. .changeset에 있는 내용들 확정 처리한다

   ```
   pnpm changeset version
   ```

   - 작성했던 changelog들이 잘 들어가 있는지 확인한다.

2. publish 한다
   ```
   pnpm publish -r
   ```

### Test 방법

1. (optional) 빌드가 필요한 package의 경우 watch 모드로 빌드 실행
   ```bash
   // example
   pnpm --filter @fdi/openapi-ts run dev
   ```
2. 이 SDK를 사용하는 프로젝트에서 해당 package의 절대 경로를 링크
   ```bash
   // example
   pnpm add -D “D://frontend-core/packages/openapi-ts”
   ```
3. SDK에서의 코드 변경 사항이 즉각적으로 반영 되는지 확인
