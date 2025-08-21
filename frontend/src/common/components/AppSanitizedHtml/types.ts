export type AppSanitizeHtmlTagName = keyof Omit<HTMLElementTagNameMap, 'script' | 'noscript' | 'embed' | 'iframe' | 'video' | 'audio' | 'canvas'>;

export interface AppSanitizeHtmlProps {
  content: string;
  allowedTags?: AppSanitizeHtmlTagName[];
}
