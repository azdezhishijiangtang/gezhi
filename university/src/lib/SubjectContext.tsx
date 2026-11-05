import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Subject } from '@/types';

const STORAGE_KEY = 'mathlens-subject';

interface SubjectContextValue {
  subject: Subject;
  setSubject: (s: Subject) => void;
  toggleSubject: () => void;
}

const SubjectContext = createContext<SubjectContextValue | null>(null);

const readInitial = (): Subject => {
  if (typeof window === 'undefined') return 'math';
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === 'math' || v === 'physics') return v;
  } catch {
    /* ignore */
  }
  return 'math';
};

export const SubjectProvider = ({ children }: { children: ReactNode }) => {
  const [subject, setSubjectState] = useState<Subject>(readInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, subject);
    } catch {
      /* ignore */
    }
    document.documentElement.dataset.subject = subject;
  }, [subject]);

  const setSubject = (s: Subject) => setSubjectState(s);
  const toggleSubject = () => setSubjectState((s) => (s === 'math' ? 'physics' : 'math'));

  return (
    <SubjectContext.Provider value={{ subject, setSubject, toggleSubject }}>
      {children}
    </SubjectContext.Provider>
  );
};

export const useSubject = (): SubjectContextValue => {
  const ctx = useContext(SubjectContext);
  if (!ctx) {
    // 兜底：未包裹时返回数学默认值
    const fallback: SubjectContextValue = {
      subject: 'math',
      setSubject: () => {},
      toggleSubject: () => {},
    };
    return fallback;
  }
  return ctx;
};
