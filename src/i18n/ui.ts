export const languages = { zh: '中文', en: 'EN' } as const;
export const defaultLang = 'zh';
export type Lang = keyof typeof languages;

/** UI chrome / labels (not editorial content — that lives in src/data/content.ts) */
export const ui = {
  zh: {
    'nav.work': '精选项目',
    'nav.studio': '在做什么',
    'nav.writing': '写作',
    'nav.about': '关于',
    'sec.work': 'Selected Work',
    'sec.studio': '我在做什么',
    'sec.about': '关于我 · About',
    'sec.writing': '写作 · Writing',
    'work.enter': '查看',
    'work.range': '点击进入详情',
    'writing.all': '全部文章',
    'writing.back': '返回写作',
    'work.back': '返回项目',
    'project.next': '下一个项目',
    'project.links': '相关链接',
    'meta.role': '角色',
    'meta.stack': '技术',
    'meta.context': '场景',
    'meta.year': '年份',
    'foot.rights': '保留所有权利',
    'lang.switch': 'EN',
    'reading': '分钟阅读',
  },
  en: {
    'nav.work': 'Work',
    'nav.studio': 'What I do',
    'nav.writing': 'Writing',
    'nav.about': 'About',
    'sec.work': 'Selected Work',
    'sec.studio': 'What I do',
    'sec.about': 'About',
    'sec.writing': 'Writing',
    'work.enter': 'View',
    'work.range': 'click to open',
    'writing.all': 'All posts',
    'writing.back': 'Back to writing',
    'work.back': 'Back to work',
    'project.next': 'Next project',
    'project.links': 'Links',
    'meta.role': 'Role',
    'meta.stack': 'Stack',
    'meta.context': 'Context',
    'meta.year': 'Year',
    'foot.rights': 'All rights reserved',
    'lang.switch': '中',
    'reading': 'min read',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Derive locale from a URL pathname (en lives under /en/, zh at root). */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return seg === 'en' ? 'en' : 'zh';
}

/** Build a localized href. zh → "/path", en → "/en/path". */
export function localizePath(path: string, lang: Lang): string {
  let p = path.startsWith('/') ? path : '/' + path;
  if (lang === 'en') p = p === '/' ? '/en/' : '/en' + p;
  return p;
}

/** Given the current URL, return the equivalent path in the other language. */
export function alternatePath(url: URL, lang: Lang): string {
  const segs = url.pathname.split('/').filter(Boolean);
  if (lang === 'en') {
    // currently zh → prepend /en
    return '/en/' + segs.join('/');
  }
  // currently en → strip leading /en
  if (segs[0] === 'en') segs.shift();
  return '/' + segs.join('/');
}
