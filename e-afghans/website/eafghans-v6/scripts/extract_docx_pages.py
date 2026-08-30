import sys
import zipfile
import xml.etree.ElementTree as ET


def extract_pages(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        with z.open('word/document.xml') as f:
            xml = f.read()

    # Parse XML
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    root = ET.fromstring(xml)

    pages = []
    current = []

    for para in root.findall('.//w:p', ns):
        texts = []
        for node in para.findall('.//w:t', ns):
            if node.text:
                texts.append(node.text)

        # check for page break within the paragraph
        brs = para.findall('.//w:br', ns)
        para_text = ''.join(texts).strip()
        if para_text:
            current.append(para_text)

        page_break = False
        for br in brs:
            if br.get('{%s}type' % ns['w']) == 'page':
                page_break = True
                break

        if page_break:
            pages.append('\n'.join(current))
            current = []

    # append remaining
    if current:
        pages.append('\n'.join(current))

    return pages


def main():
    if len(sys.argv) < 2:
        print('Usage: extract_docx_pages.py path/to/file.docx')
        sys.exit(1)
    path = sys.argv[1]
    pages = extract_pages(path)
    for i, p in enumerate(pages, start=1):
        print('--- PAGE %d ---' % i)
        print(p)
        print()


if __name__ == '__main__':
    main()
