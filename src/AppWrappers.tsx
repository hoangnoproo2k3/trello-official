'use client';
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const _NoSSR = ({ children }: any) => <React.Fragment>{children}</React.Fragment>;

const NoSSR = dynamic(() => Promise.resolve(_NoSSR), {
  ssr: false,
});

export default function AppWrappers({ children }: { children: ReactNode }) {
  return <NoSSR>{children}</NoSSR>;
}
