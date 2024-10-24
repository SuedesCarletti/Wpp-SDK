import React from 'react';
import Layout from '@theme/Layout';
import InteractiveComponent from '../components/InteractiveComponent';

function InteractivePage() {
  return (
    <Layout title="Interação com WhatsApp">
      <div className="interactive-container">
        <InteractiveComponent />
      </div>
    </Layout>
  );
}

export default InteractivePage;
