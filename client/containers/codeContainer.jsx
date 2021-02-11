import React, { useContext } from 'react';
import CodeBox from '../components/codeBox';
import ExportButton from '../components/exportButton';

// import Context Object
import { CodeContext } from '../state/contexts';

const codeContainer = () => {
  const { codeDispatch } = useContext(CodeContext);

  return (
    <div className="CodeContainer">
      <div className="codeButtons">
        <div className="fileTab" id="btn" onClick={() => codeDispatch({type: 'SHOW_SCHEMA'})}>
          <span className="noselect buttonClass">schema.js</span>
          <div id="circle"></div>
        </div>
        <div className="fileTab" id="btn" onClick={() => codeDispatch({type: 'SHOW_RESOLVER'})}>
          <span className="noselect buttonClass">resolver.js</span>
          <div id="circle"></div>
        </div>
        <ExportButton />
      </div>
      <CodeBox/>
    </div>
  );
};

export default codeContainer;