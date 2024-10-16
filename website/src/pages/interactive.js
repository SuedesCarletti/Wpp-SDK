import React from 'react';
import Layout from '@theme/Layout';
import InteractiveComponent from '../components/InteractiveComponent';

function InteractivePage() {
  return (
    <Layout title="Interactive Page">
      <div style={{ padding: '20px' }}>
        <h1>Interação com WhatsApp</h1>
        <InteractiveComponent />
      </div>
    </Layout>
  );
}

export default InteractivePage;
