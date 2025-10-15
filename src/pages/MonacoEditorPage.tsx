import React, { useState } from 'react';
import { Button, Select, Space, Alert, Card } from 'antd';
import { PlayCircleOutlined, SaveOutlined } from '@ant-design/icons';
import CodeEditor from '../components/monaco/CodeEditor';
import { SAMPLE_TYPESCRIPT_CODE } from '../constants/sampleCode';

const MonacoEditorPage: React.FC = () => {
  const [code, setCode] = useState<string>(SAMPLE_TYPESCRIPT_CODE);
  const [language, setLanguage] = useState<string>('typescript');
  const [editorTheme, setEditorTheme] = useState<string>('vs-dark');

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const handleRunCode = () => {
    console.log('Running code:', code);
    alert('Code executed! (Check the console)');
  };

  const handleSaveCode = () => {
    console.log('Saving code:', code);
    alert('Code saved successfully!');
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
  ];

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Card 
        title="Monaco Editor - Custom Hover Provider Demo"
        extra={
          <Space>
            <Select
              value={language}
              onChange={setLanguage}
              options={languages}
              style={{ width: 150 }}
            />
            <Select
              value={editorTheme}
              onChange={setEditorTheme}
              options={themes}
              style={{ width: 150 }}
            />
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={handleRunCode}
            >
              Run
            </Button>
            <Button
              icon={<SaveOutlined />}
              onClick={handleSaveCode}
            >
              Save
            </Button>
          </Space>
        }
        style={{ marginBottom: 16, flex: 0 }}
      >
        <Alert
          message="Monaco Editor Hover Provider Customization"
          description={
            <div>
              <p>
                You can customize hover tooltips in Monaco Editor using the <code>registerHoverProvider</code> API. 
                This allows you to display custom information (like inheritance details, type definitions, or documentation) 
                when hovering over functions, classes, or variables.
              </p>
              <p style={{ marginTop: '8px', marginBottom: '8px' }}>
                <strong>Key Features:</strong>
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '8px' }}>
                <li>Display inheritance and interface implementation information</li>
                <li>Show custom documentation and descriptions</li>
                <li>Support markdown formatting in hover content</li>
                <li>Access word position and model context</li>
              </ul>
              <p style={{ marginTop: '8px' }}>
                <strong>Try it:</strong> Hover over keywords like <code>User</code>, <code>Config</code>, 
                <code>processConfig</code>, <code>Map</code>, <code>Record</code>, or <code>console</code> to see custom hover information!
              </p>
              <p style={{ marginTop: '8px' }}>
                <strong>References:</strong>
                {' '}
                <a 
                  href="https://microsoft.github.io/monaco-editor/typedoc/interfaces/languages.HoverProvider.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Monaco Editor API - HoverProvider
                </a>
                {' | '}
                <a 
                  href="https://github.com/microsoft/monaco-editor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </a>
                {' | '}
                <a 
                  href="https://microsoft.github.io/monaco-editor/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Monaco Editor Playground
                </a>
              </p>
            </div>
          }
          type="info"
          closable
          style={{ marginBottom: 0 }}
        />
      </Card>

      <Card 
        bodyStyle={{ padding: 0, height: 'calc(100vh - 400px)' }}
        style={{ flex: 1, overflow: 'hidden' }}
      >
        <CodeEditor
          height="100%"
          language={language}
          value={code}
          theme={editorTheme}
          onChange={handleEditorChange}
        />
      </Card>
    </div>
  );
};

export default MonacoEditorPage;

