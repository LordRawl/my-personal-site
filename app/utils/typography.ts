const wordJoiner = (text: string) =>
  text
    .replace(/(?<![\p{L}\d])(\p{L}{1,3})[ \t\n]+/gu, '$1\u00A0')
    .replace(/[ \t\n]+([\u2014\u2013])/g, '\u00A0$1')
    .replace(/(\d\+?)[ \t\n]+(?=\p{L})/gu, '$1\u00A0')

export const applyTypography = (root: ParentNode = document.body) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentNode as HTMLElement | null
      if (
        !parent ||
        /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT|TITLE)$/.test(parent.nodeName) ||
        parent.closest('.footer__name')
      ) {
        return NodeFilter.FILTER_REJECT
      }
      return node.nodeValue?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })

  const nodes: Text[] = []
  let node: Node | null
  while ((node = walker.nextNode())) nodes.push(node as Text)
  for (const text of nodes) text.nodeValue = wordJoiner(text.nodeValue ?? '')
}
