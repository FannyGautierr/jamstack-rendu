import { marked } from 'marked';

export function useMarkdown() {
  function parse(content) {
    return marked.parse(content);
  }

  return { parse };
}
