import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  language: string;
  value: string;
  theme: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
}

interface HoverInfo {
  type: string;
  description: string;
  extends?: string | null;
  implements?: string[] | null;
  properties?: string[];
  methods?: string[];
  signature?: string;
  typeAnnotation?: string;
  contains?: string;
  returns?: string;
  syntax?: string;
  usage?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  language, 
  value, 
  theme, 
  onChange, 
  height = '100%' 
}) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<typeof monaco | null>(null);

  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoRef.current = monacoInstance as any;

    // Register custom hover provider for TypeScript
    monacoInstance.languages.registerHoverProvider('typescript', {
      provideHover: function (model, position) {
        const word = model.getWordAtPosition(position);
        if (!word) return null;

        // Define inheritance and implementation information for our sample code
        const hoverInfo: Record<string, HoverInfo> = {
          'User': {
            type: 'interface',
            description: 'Represents a user entity with authentication and metadata',
            extends: null,
            implements: null,
            properties: ['id', 'name', 'email', 'role', 'metadata']
          },
          'Config': {
            type: 'interface',
            description: 'Application configuration structure for database, API, and features',
            extends: null,
            implements: null,
            properties: ['database', 'api', 'features']
          },
          'processConfig': {
            type: 'function',
            description: 'Processes and validates configuration objects',
            extends: 'BaseProcessor (conceptual)',
            implements: ['IConfigurable', 'ILoggable'],
            signature: '(config: Config): void',
            returns: 'void'
          },
          'Map': {
            type: 'class',
            description: 'Built-in JavaScript collection for key-value pairs with any type of key',
            extends: 'Object',
            implements: ['Iterable<[K, V]>'],
            methods: ['set', 'get', 'has', 'delete', 'clear', 'forEach']
          },
          'appConfig': {
            type: 'const',
            description: 'Application-wide configuration instance',
            typeAnnotation: 'Config',
            contains: 'Database credentials, API endpoints, and feature flags'
          },
          'userRegistry': {
            type: 'const',
            description: 'Registry of users stored in a Map collection',
            typeAnnotation: 'Map<number, User>',
            contains: 'User objects indexed by user ID'
          },
          'Record': {
            type: 'utility type',
            description: 'TypeScript utility type for creating object types with specific key-value pairs',
            syntax: 'Record<Keys, Type>',
            usage: 'Creates a type with properties Keys of type Type'
          },
          'console': {
            type: 'object',
            description: 'Global console object for debugging and logging',
            extends: 'Console',
            implements: null,
            methods: ['log', 'error', 'warn', 'info', 'debug', 'table', 'trace']
          },
          'Object': {
            type: 'class',
            description: 'Base class for all JavaScript objects',
            extends: null,
            implements: null,
            methods: ['toString', 'valueOf', 'hasOwnProperty', 'keys', 'values', 'entries']
          },
          'entries': {
            type: 'method',
            description: 'Returns an array of key-value pairs from an object',
            signature: 'Object.entries(obj: object): [string, any][]',
            returns: 'Array of [key, value] tuples'
          },
          'filter': {
            type: 'method',
            description: 'Creates a new array with elements that pass the test',
            signature: '(predicate: (value: T) => boolean): T[]',
            returns: 'Filtered array'
          },
          'map': {
            type: 'method',
            description: 'Creates a new array with the results of calling a function on every element',
            signature: '(callback: (value: T) => U): U[]',
            returns: 'Transformed array'
          }
        };

        const info = hoverInfo[word.word];
        if (!info) return null;

        // Build markdown content for hover
        const contents: Array<{ value: string }> = [];
        
        // Custom Hover Provider Header with badge
        contents.push({
          value: `---`
        });
        contents.push({
          value: `🔧 **CUSTOM HOVER PROVIDER** | ${info.type.toUpperCase()}`
        });
        contents.push({
          value: `---`
        });
        
        // Title with type badge
        contents.push({
          value: `### **${word.word}**`
        });

        // Description
        if (info.description) {
          contents.push({
            value: info.description
          });
        }

        // Type-specific information
        if (info.signature) {
          contents.push({
            value: `**Signature:** \`${info.signature}\``
          });
        }

        if (info.typeAnnotation) {
          contents.push({
            value: `**Type:** \`${info.typeAnnotation}\``
          });
        }

        if (info.syntax) {
          contents.push({
            value: `**Syntax:** \`${info.syntax}\``
          });
        }

        // Inheritance information
        if (info.extends) {
          contents.push({
            value: `**Extends:** \`${info.extends}\``
          });
        }

        if (info.implements) {
          contents.push({
            value: `**Implements:** ${info.implements.map(i => `\`${i}\``).join(', ')}`
          });
        }

        // Additional details
        if (info.properties) {
          contents.push({
            value: `**Properties:** ${info.properties.map(p => `\`${p}\``).join(', ')}`
          });
        }

        if (info.methods) {
          contents.push({
            value: `**Methods:** ${info.methods.map(m => `\`${m}\``).join(', ')}`
          });
        }

        if (info.contains) {
          contents.push({
            value: `**Contains:** ${info.contains}`
          });
        }

        if (info.returns) {
          contents.push({
            value: `**Returns:** \`${info.returns}\``
          });
        }

        if (info.usage) {
          contents.push({
            value: `**Usage:** ${info.usage}`
          });
        }

        // Action buttons section at the bottom
        contents.push({
          value: `---`
        });
        contents.push({
          value: `**Actions:** [📖 View Docs](#) | [🔍 Find References](#) | [💡 Show Examples](#)`
        });

        return {
          range: new monacoInstance.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
          ),
          contents: contents
        };
      }
    });

    console.log('Custom hover provider registered for TypeScript');
  };

  return (
    <Editor
      height={height}
      language={language}
      value={value}
      theme={theme}
      onChange={onChange}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;

