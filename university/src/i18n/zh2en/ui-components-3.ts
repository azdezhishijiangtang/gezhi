/** UI 组件文案英文映射（DocLibraryPanel 资料库面板 + 其依赖的 docLibrary 错误提示） */
const dict: Record<string, string> = {
  // ── 标题与统计 ──
  '我的文档知识库': 'My Document Library',
  '{on}/{all} 份参与检索 · {n} 个段落': '{on}/{all} in retrieval · {n} chunks',
  '关闭文档面板': 'Close document panel',

  // ── 上传区 ──
  '上传文档：拖入文件，或按回车键选择文件': 'Upload a document: drop a file, or press Enter to choose one',
  '拖入文件，或点击上传': 'Drop a file here, or click to upload',
  '支持 PDF / Word / txt / Markdown，单个不超过 500MB。':
    'Supports PDF / Word / txt / Markdown, up to 500MB per file.',
  '文件仅在本地浏览器解析并存储，不会上传到任何服务器。':
    'Files are parsed and stored only in your local browser and are never uploaded to any server.',
  '正在解析《{name}》…': 'Parsing “{name}”…',
  '{done} / {total} 页': '{done} / {total} pages',
  '提取文字并分块中…': 'Extracting text and splitting into chunks…',

  // ── 错误提示 ──
  '《{name}》{msg}': '“{name}”: {msg}',
  '上传失败': 'upload failed',
  '删除失败': 'Failed to delete',
  '关闭错误提示': 'Dismiss error',
  '未能从文件中提取到文字（可能是扫描版 PDF 或空文件）':
    'No text could be extracted from the file (it may be a scanned PDF or an empty file).',
  '当前浏览器不支持 IndexedDB，无法使用文档知识库':
    'This browser does not support IndexedDB, so the document library is unavailable.',
  '当前浏览器不支持 IndexedDB，无法删除文档':
    'This browser does not support IndexedDB, so the document cannot be deleted.',
  '文档保存失败': 'Failed to save the document',
  '删除失败，请重试': 'Delete failed, please try again',

  // ── 空状态 ──
  '还没有上传资料。': 'No documents uploaded yet.',
  '上传教材、讲义或笔记后，AI 回答时会优先参考你的资料并注明出处。':
    'Upload textbooks, lecture notes, or your own notes, and the AI will consult them first and cite the sources when answering.',

  // ── 文档列表 ──
  '文本': 'Text',
  '{n} 个段落': '{n} chunks',
  '确认删除': 'Delete',
  '取消': 'Cancel',
  '停用该文档': 'Disable this document',
  '启用该文档': 'Enable this document',
  '删除 {name}': 'Delete {name}',

  // ── 检索说明 ──
  '提问时自动检索与问题最相关的段落注入 AI 上下文；关闭开关可临时让某份资料不参与检索。':
    'When you ask a question, the most relevant passages are retrieved and added to the AI context; turn a document off to temporarily exclude it from retrieval.',
};

export default dict;
