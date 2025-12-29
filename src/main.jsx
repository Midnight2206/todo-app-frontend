import { createRoot } from 'react-dom/client'
import {Provider as ReduxProvider} from "react-redux"

import '@/index.css'
import App from '@/App.jsx'
import {store} from "@/store/store";


createRoot(document.getElementById('root')).render(
  
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
)
