import React from 'react';
import { Typography } from 'antd';

const { Paragraph, Title, Text, Link } = Typography;

/**
 * Renders a markdown file content as React components.
 * This is a simplified CommonMark renderer for demonstration purposes.
 * For production use, consider using a proper markdown library.
 */
export const renderMarkdown = (markdown: string): React.ReactNode => {
  const lines = markdown.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = '';
  let language = '';
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];
  let inList = false;
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' = 'ul';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        elements.push(
          <pre key={`code-${i}`} style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '16px',
            borderRadius: '4px',
            overflowX: 'auto',
            fontFamily: 'monospace' 
          }}>
            <code className={language ? `language-${language}` : ''}>
              {codeContent}
            </code>
          </pre>
        );
        inCodeBlock = false;
        codeContent = '';
        language = '';
      } else {
        // Start of code block
        inCodeBlock = true;
        language = line.substring(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Handle tables
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        // Start of table
        inTable = true;
        tableHeaders = line
          .split('|')
          .slice(1, -1)
          .map(header => header.trim());
      } else if (line.includes('---')) {
        // Table separator, skip
        continue;
      } else {
        // Table row
        tableRows.push(
          line
            .split('|')
            .slice(1, -1)
            .map(cell => cell.trim())
        );
      }
      continue;
    } else if (inTable) {
      // End of table
      elements.push(
        <div key={`table-${i}`} style={{ overflowX: 'auto', marginBottom: '16px' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            border: '1px solid #f0f0f0' 
          }}>
            <thead>
              <tr>
                {tableHeaders.map((header, idx) => (
                  <th 
                    key={`th-${idx}`} 
                    style={{ 
                      border: '1px solid #f0f0f0',
                      padding: '8px 16px',
                      backgroundColor: '#fafafa',
                      fontWeight: 'bold'
                    }}
                  >
                    {renderInlineMarkdown(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, rowIdx) => (
                <tr key={`tr-${rowIdx}`}>
                  {row.map((cell, cellIdx) => (
                    <td 
                      key={`td-${rowIdx}-${cellIdx}`} 
                      style={{ 
                        border: '1px solid #f0f0f0',
                        padding: '8px 16px'
                      }}
                    >
                      {renderInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      inTable = false;
      tableHeaders = [];
      tableRows = [];
      continue;
    }

    // Handle lists
    if (line.match(/^[\s]*[-*+][\s]+/) || line.match(/^[\s]*\d+\.[\s]+/)) {
      if (!inList) {
        inList = true;
        listType = line.match(/^[\s]*\d+\.[\s]+/) ? 'ol' : 'ul';
      }
      // Extract the item content (remove the bullet or number)
      const itemContent = line.replace(/^[\s]*[-*+\d.][\s.]*/, '').trim();
      listItems.push(itemContent);
      continue;
    } else if (inList && line.trim() === '') {
      // End of list
      if (listType === 'ul') {
        elements.push(
          <ul key={`ul-${i}`} style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            {listItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${i}`} style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            {listItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ol>
        );
      }
      inList = false;
      listItems = [];
      continue;
    } else if (inList) {
      // If not a list item and we're in a list, add the list and reset
      if (listType === 'ul') {
        elements.push(
          <ul key={`ul-${i}`} style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            {listItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${i}`} style={{ paddingLeft: '20px', marginBottom: '16px' }}>
            {listItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '8px' }}>
                {renderInlineMarkdown(item)}
              </li>
            ))}
          </ol>
        );
      }
      inList = false;
      listItems = [];
    }

    // Skip empty lines
    if (line.trim() === '') {
      continue;
    }

    // Handle headings
    if (line.startsWith('# ')) {
      elements.push(
        <Title key={`h1-${i}`} level={1}>
          {renderInlineMarkdown(line.substring(2))}
        </Title>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <Title key={`h2-${i}`} level={2}>
          {renderInlineMarkdown(line.substring(3))}
        </Title>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <Title key={`h3-${i}`} level={3}>
          {renderInlineMarkdown(line.substring(4))}
        </Title>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <Title key={`h4-${i}`} level={4}>
          {renderInlineMarkdown(line.substring(5))}
        </Title>
      );
    } else if (line.startsWith('##### ')) {
      elements.push(
        <Title key={`h5-${i}`} level={5}>
          {renderInlineMarkdown(line.substring(6))}
        </Title>
      );
    } else {
      // Regular paragraph
      elements.push(
        <Paragraph key={`p-${i}`}>
          {renderInlineMarkdown(line)}
        </Paragraph>
      );
    }
  }

  // Handle any trailing lists
  if (inList) {
    if (listType === 'ul') {
      elements.push(
        <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          {listItems.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol style={{ paddingLeft: '20px', marginBottom: '16px' }}>
          {listItems.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ol>
      );
    }
  }

  return <div>{elements}</div>;
};

// Helper function to render inline markdown elements like bold, italic, etc.
const renderInlineMarkdown = (text: string): React.ReactNode => {
  // Replace ** with bold
  let result = text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text key={index} strong>{part.substring(2, part.length - 2)}</Text>;
    }
    return part;
  });

  // Replace * with italic
  result = result.map((part) => {
    if (typeof part === 'string') {
      return part.split(/(\*[^*]+\*)/g).map((subpart, subindex) => {
        if (subpart.startsWith('*') && subpart.endsWith('*')) {
          return <Text key={subindex} italic>{subpart.substring(1, subpart.length - 1)}</Text>;
        }
        return subpart;
      });
    }
    return part;
  }).flat();

  // Replace [text](url) with links
  result = result.map((part) => {
    if (typeof part === 'string') {
      return part.split(/(\[[^\]]+\]\([^)]+\))/g).map((subpart, subindex) => {
        const match = subpart.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          return <Link key={subindex} href={match[2]}>{match[1]}</Link>;
        }
        return subpart;
      });
    }
    return part;
  }).flat();

  // Replace `code` with inline code
  result = result.map((part) => {
    if (typeof part === 'string') {
      return part.split(/(`[^`]+`)/g).map((subpart, subindex) => {
        if (subpart.startsWith('`') && subpart.endsWith('`')) {
          return (
            <Text key={subindex} code>
              {subpart.substring(1, subpart.length - 1)}
            </Text>
          );
        }
        return subpart;
      });
    }
    return part;
  }).flat();

  return result;
};

/**
 * Loads and renders the content of a markdown file
 */
export const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  return <>{renderMarkdown(content)}</>;
}; 