# @zakelstorm/openapi-ts

OpenAPI/Swagger TypeScript 코드 생성기

## 설치

```bash
npm install @zakelstorm/openapi-ts
# 또는
pnpm add @zakelstorm/openapi-ts
```

## 사용법

### CLI

```bash
openapi-ts --path http://example.com/swagger.json --output ./src/api --moduleName API
```

### 프로그래밍 방식

```typescript
import { generateApi } from '@zakelstorm/openapi-ts'

generateApi({
  path: 'http://example.com/swagger.json',
  output: './src/api',
  moduleName: 'API',
})
```

## 옵션

- `path`: OpenAPI/Swagger 스키마 경로 또는 URL
- `output`: 생성된 파일을 저장할 경로
- `moduleName`: 생성될 모듈명
- `extractQueryParams`: 쿼리 파라미터를 별도 타입으로 추출 (기본값: false)
- `extractRequestBody`: 요청 본문을 별도 타입으로 추출 (기본값: false)
- `extractResponseBody`: 응답 본문을 별도 타입으로 추출 (기본값: false)
- `preserve`: 기존 타입명 보존 (기본값: false)
- `patchType`: 타입 패치 파일 경로

## 테스트

```bash
# 테스트 실행
pnpm test

# 커버리지 포함 테스트
pnpm test:coverage

# 워치 모드로 테스트
pnpm test:watch

# UI 모드로 테스트
pnpm test:ui
```

## 개발

```bash
# 개발 모드 실행
pnpm dev

# 빌드
pnpm build
```
