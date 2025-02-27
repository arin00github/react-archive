"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // ServerStyleSheet : 클래스는 스타일을 서버에서 렌더링한 후, 클라이언트로 전달할 수 있게 해줌
  // 초기값으로 ServerStyleSheet의 인스턴스를 생성
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  // 서버에서 HTML을 렌더링할 때 클라이언트에 삽입해야 할 추가 HTML을 처리
  useServerInsertedHTML(() => {
    // styled-components에서 생성된 <style> 태그를 가져옵니다.
    // 이 태그는 styled-components가 서버에서 렌더링한 스타일을 포함하고 있습니다
    const styles = styledComponentsStyleSheet.getStyleElement();

    // 불필요한 스타일 태그가 HTML에 중복으로 삽입되지 않도록 인스턴스에서 사용한 스타일태그를 클리어.
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // 클라이언트 환경에서만 children을 바로 렌더링하도록 합니다
  if (typeof window !== "undefined") return <>{children}</>;

  return (
    // 스타일을 관리하는 컴포넌트.
    // 서버 사이드에서 스타일을 렌더링할 때 필요, 서버에서 생성된 스타일 시트를 클라이언트에 전달하는 데 사용
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
