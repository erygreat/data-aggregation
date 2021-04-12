import React from 'react';
import ReactDOM from 'react-dom';
import '@/index.css';
import '@/stylesheets/common.css'
import App from "@/App"
import plugins from "@/plugins";

ReactDOM.render(<App plugins={ plugins }/>, document.getElementById('root'));